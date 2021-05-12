var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
    //List of demand, using query
    //var num_day = req.query.dates;
    //insert code here
    //...

    //function to calculate plans
    //insert code here
    //....

    //save plan to user's profile
    //insert code here
    //...

    //after all, render
    res.render('planning/plan', {
        auth: true,
        user: req.session.authUser ,
        plan: plan
    });
})
module.exports = router;
