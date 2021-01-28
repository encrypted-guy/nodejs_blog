const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let users_info = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }


});
let Users = mongoose.model('users', users_info);
module.exports = Users;