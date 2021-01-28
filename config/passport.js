const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        let query = {email: username}; // taking username as email
        Users.findOne(query, (error, user) => {
            if(error){
                console.log(ERROR(`cant acces the user detais | ${error}`));
            }
            if(!user){
                return done(null, false, console.log(ERROR(` USER NOT FOUND`)) );
            }

            bcrypt.compare(password, user.password, (error, isMatch) => {
                if(error){
                    console.log(ERROR(`cant dcrypt the password | ${error}`));
                }
                if(isMatch){
                    return done(null, user, console.log(SUCCESS(`YOU ARE LOGGED IN`)) );
                }else{
                    return done(null, false, console.log(ERROR(`WRONG PASSWORD`)) );
                }
            });
        });
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        Users.findById(id, (err, user) => {
            done(err, user);
        });
    });
}