var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sessions = require('client-sessions')
require('dotenv').config()

var routes = require('./routes/index');
var api = require('./routes/api');
var account = require('./routes/account');
var geo = require('./routes/geo');

//var dbUrl = 'mongodb://localhost/local-chat'

// mongoose.connect(dbUrl, function(err, res){
mongoose.connect(process.env.MONGO_DB, function(err, res){
    if (err) {
        console.log('dataBase connection failed: '+err)
    }
    else{
    console.log('connected successfully to: '+process.env.MONGO_DB)   
    }

})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions({
  cookieName: 'session',
  secret: 'ajajfjwfajwef',
  duration: 24*60*60*1000,
  activeDuration: 30*60*1000,
}))


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/account', account);      //app.use('/login', account)
app.use('/geo', geo );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
