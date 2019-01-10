var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var blogRouter = require("./routes/blog");
var detailRouter = require("./routes/detail");

//----------连接数据库---------------
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/xiangmu1206");


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "kerwinNodeSessID",
    secret:"kerwindwajlk", 
    cookie: {maxAge: 1000*3600 }, 
    resave: true, 
    saveUninitialized: true
}));  

 


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/register",registerRouter);
app.use("/login",loginRouter);
app.use("/blog",blogRouter);
app.use("/detail",detailRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
