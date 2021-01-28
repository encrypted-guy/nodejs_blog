const express = require('express');
const router = express.Router();
const async = require('async');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const posts = require('../models/posts');

router.get('/', (req, res )=> {
    // console.log(req.user);
    let local = {};
    async.parallel([
        all_post => {
            posts.find({}, (error, post) => {
                if(error){
                    console.log(ERROR(`cant get the all data to send to HOME`));
                }else{
                    local.posts = post;
                }
                all_post();
            });
        },randomposts => {
            posts.countDocuments({}, (error, count) => {
                var random  = Math.floor(Math.random() * count/2);
                var doc = posts.find({}).skip(random).limit(3);
                doc.find({}, (error, posts) => {
                    if(error){
                        console.log(ERROR(`cant get the pospuler post data to send to HOME`));
                    }else{
                        local.populer = posts;
                        randomposts();
                    }
                });
                
            });
        }
    ], error => {
        if(error){
            console.log(ERROR(`error on HOME async function | ${error}`));
        }else{
            res.render('index', {
                posts: local.posts,
                populer: local.populer
            });
        }
    });
})




module.exports = router;