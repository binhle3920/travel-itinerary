var express = require('express');
var router = express.Router();

var desDb = require('../models/khuvuc.model');

router.get('/:CODE', async function(req, res) {
    var detail = await desDb.select_alldiadiem(req.params.CODE)
    var detail_name = await desDb.select_kvname(req.params.CODE)
    var img_link = await desDb.select_khuvucimgs(req.params.CODE)
    console.log(img_link[0].IMGLINK)
    
    if (detail_name != null)
    {
        detail_name = detail_name.NAME
    }

    var auth = req.session.auth;
    var user = null;

    if (auth == true) 
        user = req.session.authUser;

    res.render('destinations/detail',{ 
        auth: auth,
        user: user,
        detail: detail,
        name: detail_name,
        img_link: img_link
    });
})

router.get('/', async function(req, res) {
    var des = await desDb.select_allkv()

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