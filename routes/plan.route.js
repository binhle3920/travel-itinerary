var express = require('express');
var router = express.Router();

var areaDb = require('../models/khuvuc.model');
var ddDb = require('../models/diadiem.model');
var planDb = require('../models/plan.model');

router.get('/', async function(req, res) {
    var plan = await planDb.select_plan(req.query.plan_id);
    
    var dateList = [];
    var startDate = new Date(plan.STARTDATE);
    startDate.setDate(startDate.getDate());
    var endDate = new Date(plan.ENDDATE);
    endDate.setDate(endDate.getDate());

    var dateFormat = require('dateformat');
    for (var date = startDate; date <= endDate; date.setDate(date.getDate() + 1))
        dateList.push(dateFormat(date, "fullDate"));

    var detailPlan = [];
    for(var day=1; day<=dateList.length; day++){
        var dayEvents = await planDb.select_detailplan(plan.ID, day);
        detailPlan.push(dayEvents);
    }

    var desList = await ddDb.select_des_from_area(plan.ID_AREA);

    // console.log(plan);

    res.render('planning/plan', {
        auth: true,
        user: req.session.authUser,
        plan: plan,
        dateList: dateList,
        desList: desList,
        detailPlan: detailPlan,
    });
})
module.exports = router;
