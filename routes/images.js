const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

// additional database

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const posts = require('../models/posts');

// router.get('/all_image', (req, res) => {
//     posts.find({}, (error, images) => {
//         if(error){
//             console.log(ERROR(`cant send all the info as images | ${error}`));
//         }else{
//             res.json(images);
//         }
//     });
// });

router.get('/image/:filename', (req, res) => {
    posts.findOne({ filename: req.params.filename }, (error, file) => {
        if(error){
            console.log(ERROR(` cant get the each image info | ${error}`));
        }else{
            if(!file || file.length === 0){
                console.log(ERROR(` no file exists`));
                return res.status(404).json({ // can remove this
                    error: 'no file exixts'
                });
            }else{
                // checkinf if its an image
                if(file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
                    // readout put to browser
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                }else{
                    console.log(ERROR( ` not an image`));
                    res.status(404).json({ // can remove this
                        error: 'not an image'
                    });
                }
            }
        }
    });
});

module.exports = router;