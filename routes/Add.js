const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const upload = require('../config/image');
const posts = require('../models/posts');

// access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
        console.log(ERROR('you are not logged in to do this'));
    }
}

router.get('/:user/add', ensureAuthenticated ,(req, res )=> {
    res.render('add');
});

//:user/add
router.post('/add',upload.single('file'), (req, res) => {
    //console.log(req.file);
    //console.log(req.body);
    let date_info = new Date;
    let date_into = (date_info.getMonth()+1) + '/' + date_info.getDate() + '/' +  date_info.getFullYear();
    const filename = req.file.filename;
    const imgurl = `/image/${req.file.filename}`;
    const contentType = req.file.contentType;
    const file_id = req.file.id;
    const title = req.body.title;
    const author = req.user._id;
    const discription = req.body.discription;
    const catagory = req.body.catagory;

    let new_post = new posts({
        title: title,
        author: author,
        discription: discription,
        date: date_into,
        catagory: catagory,
        filename: filename,
        imgurl: imgurl,
        contentType: contentType,
        file_id: file_id
    });
    new_post.save(error => {
        if(error){
            console.log(ERROR(` can't save the post to DB | ${error} `));
        }else{
            console.log(SUCCESS(` post saved to the DB `));
            res.redirect('/');
        }
    });
});



module.exports = router;