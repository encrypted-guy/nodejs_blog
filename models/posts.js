const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let post_info = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    filename: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    file_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads.files"
    }
    
});
let posts = mongoose.model('posts', post_info);
module.exports = posts;