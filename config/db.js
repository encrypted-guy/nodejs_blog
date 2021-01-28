const mongoose = require('mongoose');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;

const URL = process.env.MONGO_URL;
// const URL = 'mongodb://localhost/BLOG';

console.log(URL)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(URL);
const conn = mongoose.connection;
conn.on('error', error => {
    console.log(ERROR('cant connect to DB'));
});


conn.once('open', () => {
    console.log(SUCCESS(' DB connection successfull '));
});


