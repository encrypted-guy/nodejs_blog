const express = require('express');
const router = express.Router();
const async = require('async');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const posts = require('../models/posts');
let Users = require('../models/users');

router.get('/post/:id', (req, res )=> {
    let id = req.params.id;
    let local = {};
    async.parallel([
        each_post => {
            posts.findById(id, (error, post) => {
                if(error){
                    console.log(ERROR(`cant get the EACH data to send to EACH ${error}`));
                }else{
                    Users.findById(post.author, (error, user) => {
                        if(error){
                            console.log(`ERROR: cant get user to send to each | ${error}`);
                        }else{
                            local.post = post;
                            local.author = user.name;
                            local.user_info = user
                        } 
                    });
                }
                each_post();
            });
        },randompostslist => {
            posts.countDocuments({}, (error, count) => {
                var random  = Math.floor(Math.random() * count/2);
                var doc = posts.find({}).skip(random).limit(4);
                doc.find({}, (error, posts) => {
                    if(error){
                        console.log(ERROR(`cant get the randam post data to send to EACH`));
                    }else{
                        local.randompost = posts;
                        randompostslist();
                    }
                });
                
            });
        }
    ], error => {
        if(error){
            console.log(ERROR(`error on HOME async function on EACH | ${error}`));
        }else{
            res.render('each', {
                post: local.post,
                randompost: local.randompost,
                author: local.author,
                user_info: local.user_info
            });
        }
    });
})

// delete post
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const conn = mongoose.connection;
let gfs; 
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});
router.get('/post/delete/:id', (req, res) => {
    posts.findById(req.params.id, (error, post) => {
        if(error){
            console.log(`ERROR: cant get the item to delete | ${error}`)    ;
        }else{
            // const _id = fruit._id;
            const file_id = post.file_id;
            console.log(chalk.bgBlue(file_id));
            post.remove((error, deleted) => {
                if(error){
                    console.log(`ERROR: cant delete the post | ${error}`);
                }else{
                    gfs.remove({_id: file_id, root: 'uploads'}, (error, gridStore) => {
                        if(error){
                            return res.status(404).json({err: err});
                        }
                        res.redirect('back');
                        console.log(`SUCCESS: deleted`);
                    });
                }
            });

        }
    });
});

module.exports = router;