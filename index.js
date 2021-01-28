const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const chalk = require('chalk');
const SUCCESS = chalk.bgGreen.black;
const ERROR = chalk.bgRed.black;
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

require('./config/db');

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('json spaces', 3);
app.use('/public',express.static('public'));
app.use(session({
    secret: process.env.PASSPORT_SECRECT,
    resave: false,
    saveUninitialized: true
}));

// image
require('./config/image');
app.use(methodOverride('_method'));

// passport setups
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// global   
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//ROUTES
app.use('/', require('./routes/home')); // home
app.use('/', require('./routes/Add')); // add post
app.use('/', require('./routes/images')); // images
app.use('/', require('./routes/catagory')); // images
app.use('/', require('./routes/each')); // each post | post delete
app.use('/', require('./routes/edit')); // edit post
app.use('/', require('./routes/register')); // register
app.use('/', require('./routes/login')); // LOGIN
app.use('/', require('./routes/user')); // user



//ERROR HANDLERS
// feild error
app.use(function (err, req, res, next) {
    console.log(ERROR('This is the invalid field ->', err.field));
    next(err)
});
app.use(function (err, req, res, next) {
    console.error(ERROR('SOMETHING IS WRONG'+ err.stack))
    next(err);
});

app.listen(process.env.PORT, () => {
    console.log(SUCCESS(`server running on port ${process.env.PORT} `));
});