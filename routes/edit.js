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


router.get('/post/:name/edit/:id', ensureAuthenticated, (req, res) => {
    let name = req.params.name;
    let id = req.params.id;
    // console.log(`${id} | ${name}`);
    posts.findById(id, (error, post) => {
        if(error){
            console.log(ERROR(`cant send the edit info to edit page`));
        }else{
            res.render('edit', {
                post: post
            })
        }
    });
});

router.post('/post/edit/:id', ensureAuthenticated, (req, res) => {
    let post_update = {};
    post_update.title = req.body.title;
    post_update.catagory = req.body.catagory;
    post_update.discription = req.body.discription;

    let query = {_id: req.params.id};
    posts.update(query, post_update, error => {
        if(error){
            console.log(ERROR(` cant update the edited POST | ${error}`));
        }else{
            console.log(SUCCESS(`POST updated`));
            res.redirect('back');
            // console.log(`/post/${req.params.id}`)
        }
    });
});

module.exports = router;