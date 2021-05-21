var express = require('express');
var router = express.Router();
var userDb = require('../models/user.model');
var auth = require('../middlewares/auth.mdw');
var data = require('../models/khuvuc.model');
var dd_data = require('../models/diadiem.model')
var plan_data = require('../models/plan.model')

/* GET home page. */
router.get('/', async function(req, res) {
  var auth = req.session.auth;
  var user = null;
  var top_des = await data.select_topdes();
  var info_topdes = await data.select_info_topdes();

  if (auth == true) 
    user = req.session.authUser;
  
  var planList = await plan_data.select_top_plan();
  console.log(planList);
  res.render('index', { 
    auth: auth,
    user: user,
    top_des: top_des,
    info_topdes: info_topdes,
    planList: planList,
  });
});

// Get my plan
router.get('/myplan', async function(req, res) {
  var top_des = await data.select_topdes()
  var auth = req.session.auth;
  var user = null;

  if (auth == true) 
    user = req.session.authUser;
    var my_plan = await plan_data.select_allplanofuser(req.session.authUser.username)
    
  if (my_plan != null)
  {
    res.render('planning/myplan', { 
      auth: auth,
      user: user,
      top_des: top_des,
      my_plan: my_plan
    });
  }
  else{
    res.render('planning/myplan', { 
      auth: auth,
      user: user,
      my_plan: my_plan
    });
  }

});

// Get favorite place
router.get('/favplace', async function(req, res) {
  var top_des = await data.select_topdes()
  var auth = req.session.auth;
  var user = null;

  if (auth == true) 
    user = req.session.authUser;
    var fav_place = await dd_data.select_favplace(req.session.authUser.username)

  if (fav_place != null)
  {
    res.render('planning/favplace', { 
      auth: auth,
      user: user,
      top_des: top_des,
      fav_place: fav_place
    });
  }
  else{
    res.render('planning/favplace', { 
      auth: auth,
      user: user,
      top_des: top_des
    });
  }
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
