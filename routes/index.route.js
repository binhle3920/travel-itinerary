var express = require('express');
var router = express.Router();
// var db = require('../utils/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  // db.load("123");
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs', {
    msg: 0
  });
});
module.exports = router;
