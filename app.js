var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

var routes = require('./routes');

// making connection to database
const localDB = 'mongodb://localhost:27017/one-piece-store'
mongoose.set('strictQuery', false);
(async function main() {
  await mongoose.connect(process.env.MONGODB_URI || localDB)
})()
  .then(() => {
    if (!process.env.MONGODB_URI) {
      console.info('connected to LOCAL database');
    } else {
      console.info('connected to database');
    }
  })
  .catch(() => console.log('Failed to connect to Database'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(rateLimiter({ // set max 20 request per minutes
  windowMs: 1 * 60 * 1000, // 60 seconds
  max: 20,
}))
app.use(compression());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'data:', 'https://res.cloudinary.com']
    }
  }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
