var express = require('express');
var router = express.Router();

//load db
var userDb = require('../models/user.model');
var areaDb = require('../models/khuvuc.model');
var desDb = require('../models/diadiem.model');

router.get('/manage-user', async function(req, res) {
    var user = await userDb.select_all_user();
    console.log('d')
    console.log(user)

    res.render('admin/admin', {
        user: user,
        des: null,
        area: null,
        feedback: null
    });
});

router.get('/manage-regions', async function(req, res) {
    var area = await areaDb.select_allkv();

    res.render('admin/admin', {
        user: null,
        des: null,
        area: area,
        feedback: null,
    });
});

router.get('/manage-des', async function(req, res) {
    var des = await desDb.select_allkv();
  
    res.render('admin/admin', {
        user: null,
        des: des,
        area: null,
        feedback: null,
    });
})

module.exports = router;