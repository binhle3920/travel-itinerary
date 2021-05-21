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
    var top_des = await desDb.select_topdes()

    for (var d = 0; d < detail.length; d++)
    {
        temp = await ddDb.select_img(detail[d].TENDD)
        if (!temp)
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

    res.render('destinations/area_info',{ 
        auth: auth,
        user: user,
        detail: detail,
        name: name,
        img_link: img_link,
        kv_descrip_rate: kv_descrip_rate,
        arr_dd_img: arr_dd_img,
        img_2d: img_2d,
        top_des: top_des
    });
})

router.get('/:CODE/:ID', async function(req, res) {
    var auth = req.session.auth;
    var user = null;
    var top_des = await desDb.select_topdes()
    var info_dd = await ddDb.select_diadiem(req.params.CODE, req.params.ID)
    var img = await ddDb.select_allimage(req.params.ID)
    var name = info_dd.TENDD

    if (auth == true) 
        user = req.session.authUser;

    res.render('destinations/des_info',{ 
        auth: auth,
        user: user,
        top_des: top_des,
        info_dd: info_dd,
        img: img, 
        name: name
    });
})

router.get('/', async function(req, res) {
    var des = await desDb.select_allkv()
    var top_des = await desDb.select_topdes()
    var auth = req.session.auth;
    var user = null;

    if (auth == true) 
        user = req.session.authUser;

    res.render('destinations/list_area', { 
        auth: auth,
        user: user,
        des: des,
        top_des: top_des
    });
})

module.exports = router;