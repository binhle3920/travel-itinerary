var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//require middlewares
require('dotenv').config();
require('./middlewares/session.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/route.mdw')(app);


// error handler  
app.use(function (err, req, res, next) {
  res.render('error/500');
})

//Open port
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce app is listening at http://localhost:${PORT}`)
})
