var express = require('express');
var auth = require('../middlewares/auth.mdw');
var router = express.Router();

//load db
var userDb = require('../models/user.model');

router.get('/', function(req, res) {
    res.render('authen');
});

router.post('/sign-up', async function(req, res) {
    res.redirect('back');
});

router.get('/user-exists', async function(req, res) {
    var username = req.query.username;
    var user = await userDb.select_user(username);
    if (user === false) {
        //redirect to internal error page
        res.redirect('back');
        return;
    }

    if (user == null) {
        return res.json(false);
    }
    
    return res.json(true);
});

router.get('/email-exists', async function(req, res) {
    var email = req.query.email;
    var user = await userDb.select_user_by_email(email);

    if (user == false) {
        //redirect to internal error page
        return res.redirect('back');
    }

    if (user == null)
        return res.json(false);

    return res.json(true);
});

module.exports = router;