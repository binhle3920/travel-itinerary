var express = require('express');
var router = express.Router();
var userDb = require('../models/user.model');
var auth = require('../middlewares/auth.mdw');
var data = require('../models/khuvuc.model');

/* GET home page. */
router.get('/', async function(req, res) {
  var auth = req.session.auth;
  var user = null;
  var top_des = await data.select_topdes()
  var info_topdes = await data.select_info_topdes()

  if (auth == true) 
    user = req.session.authUser;
  
  res.render('index', { 
    auth: auth,
    user: user,
    top_des: top_des,
    info_topdes: info_topdes
  });
});

// Get planning view 
router.get('/itinerary', async function(req, res) {
  var auth = req.session.auth;
  var user = null;

  if (auth == true) 
    user = req.session.authUser;
  
  res.render('planning/plan', { 
    auth: auth,
    user: user
  });
});


//sign out
router.get('/sign-out', auth.isLogin, function(req, res) {
  console.log("Signing out");
  req.session.auth = false;
  req.session.authUser = null;
  req.session.retUrl = null;

  const url = req.headers.referer || '/';
  console.log(req.session);
  res.redirect('back');
})

module.exports = router;
