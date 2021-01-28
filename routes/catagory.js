const express = require('express');
const router = express.Router();
const async = require('async');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const posts = require('../models/posts');

router.get('/catagory/:type',(req, res) => {
    let cat = req.params.type;
    posts.find({ catagory: cat }, (error , catagory) => {
        if(error){
            console.log(ERROR(`cant get the catogory | ${error}`));
        }else{
            res.render('catagory', {
                catagory: catagory,
                top_title: cat
            });
        }
    });
});

module.exports = router;