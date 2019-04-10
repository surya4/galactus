// External Package
const express = require('express');
// const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
// const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoLib = require('./src/lib/mongo');

mongoLib.inititalize(
  process.env.MONGODB_HOST,
  process.env.MONGODB_NAME
);

// Load environment variables from .env file
dotenv.load();

// Routers
const index = require('./src/routes/index');
const user = require('./src/routes/user');

const app = express();

// app.use(favicon(path.join(__dirname, './src/public', '/images/favicon.ico')));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(expressValidator());
// app.use(methodOverride('_method'));
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(flash());
// app.use(function(req, res, next) {
//     res.locals.user = req.user;
//     next();
// });

// app.use(express.static(path.join(__dirname, './src/public')));

app.use('/index', index);
app.use('/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    // res.render('pages/404', {
    //     'message': 'Page not found'
    // });
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('appjs err ', err)

    // render the error page
    res.status(err.status || 500);
    // res.render('pages/error');
    res.json({ error: err })
});

module.exports = app;