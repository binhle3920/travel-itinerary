var express = require('express');
var router = express.Router();
var db = require('../utils/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.load("123");
  res.render('index', { title: 'Express' });
});

module.exports = router;
