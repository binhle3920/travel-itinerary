var express = require('express');
var router = express.Router();
var userDb = require('../models/user.model');

/* GET home page. */
router.get('/', async function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
