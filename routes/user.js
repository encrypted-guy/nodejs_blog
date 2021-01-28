const express = require('express');
const router = express.Router();
const async = require('async');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

let posts = require('../models/posts');
let Users = require('../models/users');

// access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
        console.log(ERROR('you are not logged in to do this'));
    }
}


router.get('/user/:name/:userid', (req, res) => {
    let username = req.params.name;
    let userid = req.params.userid;

    // Users.findById(userid, (error, user_info) => {
    //     if(error){
    //         console.log(ERROR(`cant send theuser info ro user page | ${error}`));
    //     }else{
    //         console.log(user_info)
    //         let name = user_info.name;
    //         let date = user_info.date;
    //         let user_id = user_info._id;

    //     }
    // });
    // res.render('user');

    let local = {};
    async.parallel([
        users => {
            Users.findById(userid, (error, user_info) => {
                if(error){
                    console.log(ERROR(`cant send the users info to user | ${error}`));
                }else{
                    local.name = user_info.name;
                    local.date = user_info.date;
                    local.user_id = user_info._id;

                    users();
                }  
            });
        },
        postsfunc => {
            posts.find({author: userid}, (error, post_belong) => {
                if(error){
                    console.log(ERROR(`cant get the POST that belongs to user | ${error}`));
                }else{
                    local.post_belong = post_belong;
                    postsfunc();
                }
            })
        }
    ], error => {
        if(error){
            console.log(ERROR(`cant send the data to user page | ${error}`));
        }else{
            res.render('user', {
                post_belong: local.post_belong,
                name: local.name,
                date: local.date,
                user_id: local.user_id
            });
        }
    });
});




// username edit
router.post('/user/:name/:userid', ensureAuthenticated, (req, res) => {
    // console.log(`${req.params.name} | ${req.params.userid}`);
    let user_update = {};
    user_update.name = req.body.name;

    let query = {_id: req.params.userid};
    Users.update(query, user_update, error => {
        if(error){
            console.log(ERROR(` cant update the edited USER | ${error}`));
        }else{
            console.log(SUCCESS(`USER updated`));
            res.redirect('back');
            // console.log(`/post/${req.params.id}`)
        }
    });
});

// logout
router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logOut();
    console.log(SUCCESS(`logged out`));
    res.redirect('/login');
});

module.exports = router;