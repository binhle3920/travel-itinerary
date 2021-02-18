var express = require('express');
var router = express.Router();

var desDb = require('../models/khuvuc.model');

router.get('/:CODE', async function(req, res) {
    var des = await desDb.select_alldiadiem(req.params.CODE)

    for (var i = 0; i < des.length; i++) { 
        console.log(des[i])
    } 
    var auth = req.session.auth;
    var user = null;

    if (auth == true) 
        user = req.session.authUser;

    res.render('destinations/detail',{ 
        auth: auth,
        user: user,
        des: des
    });
})

module.exports = router;