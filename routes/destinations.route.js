var express = require('express');
var router = express.Router();

var desDb = require('../models/khuvuc.model');
var ddDb = require('../models/diadiem.model');

router.get('/:CODE', async function(req, res) {
    var detail = await desDb.select_alldiadiem(req.params.CODE)
    var detail_name = await desDb.select_kvname(req.params.CODE)
    var img_link = await desDb.select_khuvucimgs(req.params.CODE)
    var kv_descrip_rate = await desDb.select_khuvuc(req.params.CODE)
    var arr_dd_img = []
    var temp = ''
    var img_2d = []
    var tag_element = ''
    var tag_element_slice = ''
    var name = ''

    for (var d = 0; d < detail.length; d++)
    {
        temp = await ddDb.select_img(detail[d].TENDD)
        arr_dd_img.push(temp.IMGLINK)
        
        temp_img = await ddDb.select_tag(detail[d].ID)
        for (var i = 0; i < temp_img.length; i++)
        {
            tag_element += temp_img[i].TAG + ', '           
        }
        tag_element_slice = (' ' + tag_element).slice(0, tag_element.length-1)
            img_2d.push(tag_element_slice)
        tag_element = ''
    }

    if (detail_name != null)
    {
        name = detail_name.NAME
    }

    var auth = req.session.auth;
    var user = null;

    if (auth == true) 
        user = req.session.authUser;

    res.render('destinations/detail',{ 
        auth: auth,
        user: user,
        detail: detail,
        name: name,
        img_link: img_link,
        kv_descrip_rate: kv_descrip_rate,
        arr_dd_img: arr_dd_img,
        img_2d: img_2d
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