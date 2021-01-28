const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

let Users = require('../models/users');


// check if user is logged in | if user is then cant go to reg oage
function notAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/');
        console.log(SUCCESS('you are logged in '));
    }
}

router.get('/register', notAuthenticated, (req, res) => {
    res.render('register');
});



router.post('/register', notAuthenticated, (req, res) => {


    let date_info = new Date;
    let date_into = (date_info.getMonth()+1) + '-' + date_info.getDate() + '-' +  date_info.getFullYear();
    let name = req.body.name;
    let email = req.body.email.toLowerCase();
    let password = req.body.password1;
    let password2 = req.body.password2;

    if(password === password2){
        let new_user = new Users({
            name: name,
            date: date_into,
            email: email,
            password: password
        });
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(new_user.password, salt, (error, hash) => {
                if(error){
                    console.log(ERROR(`cant encrypt the password | ${error}`));
                    return;
                }else{
                    console.log('came up to here');
                    new_user.password = hash;
                    new_user.save(error => {
                        if(error){
                            console.log(ERROR(`cant create the user ${error}`));
                            return;
                        }else{
                            console.log(SUCCESS(`user registered`));
                            res.redirect('/login');
                        }
                    });
                }
            })
        });
    } else {
        console.log(ERROR(`password do not match`));
    }
});


module.exports = router;