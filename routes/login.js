const express = require('express');
const router = express.Router();
const passport = require('passport');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

let Users = require('../models/users');


// check if user is logged in | if user is then cant go to LOGIN oage
function notAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/');
        console.log(SUCCESS('you are logged in '));
    }
}

router.get('/login', notAuthenticated,  (req, res) => {
    res.render('login');
});
router.post('/login',notAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
	
});


module.exports = router;