var express = require('express');
var router = express.Router();
var userDb = require('../models/user.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //test
  //console.log(await userDb.insert_user({username: 'user7', email: '123@g.c', password: '123', fullname: 'Hello', dob: '2002-10-20'}));
  console.log(await userDb.select_user('user1'));
  //render
  res.render('index', { title: 'Express' });
});

module.exports = router;
