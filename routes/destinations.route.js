var express = require('express');
var router = express.Router();

var desDb = require('../models/khuvuc.model');

router.get('/', async function(req, res) {
    var des = desDb.select_allkv()

    var auth = req.session.auth;
    var user = null;

    if (auth == true) 
        user = req.session.authUser;
  
    res.render('destinations/destinations', { 
        auth: auth,
        user: user,
        des: des
    });
})

module.exports = router;