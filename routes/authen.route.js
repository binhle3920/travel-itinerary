var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var email_config = require('../config/config.json').mail;

//load db
var userDb = require('../models/user.model');

//config email
var user_ins = null, host, rand;
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: email_config
});

//router get
router.get('/', function(req, res) {
    res.render('authen/authen');
});

//handle login
router.post('/sign-in', async function(req,res) {
    var password = req.body.si_pass;
    var username = req.body.si_user;
    
    //username always exists in db (had preprocessed)
    var user = await userDb.select_user(username);
    if (user == false)
        res.render('error/500');
    
    if (!(bcrypt.compareSync(password, user.password))) {
        res.end('Password is incorrect');
        return;
    }

    //if password is correct
    req.session.auth = true;
    req.session.authUser = user;
    const url = req.session.retUrl || '/';
    
    res.redirect('/');
})
//handle sign up and email verify
router.post('/sign-up', async function(req, res) {
    const salt = bcrypt.genSaltSync(10);
    var hash_psw = bcrypt.hashSync(req.body.su_pass, salt);

    user_ins = {
        "username": req.body.su_user,
        "email": req.body.su_email,
        "password": hash_psw,
        "fullname": null,
        "dob": Infinity,
        "type": 'user',
        "google": 0
    }

    rand = Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    var link = "http://"+req.get('host')+"/authen/verify?id=" + rand;
    mailOptions = {
        to : user_ins.email,
        subject : "Please confirm your Email account on Travel Itinerary",
        html : `Hello ${user_ins.username}, <br>
        Please click on the link to verify your email. <br>
        <a href="${link}"><button style="padding: 20px; background-color: black; color: white">Click here to verify</button></a>`
    }

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if(error){
            res.render('error/500')
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });

    //render page to noti email has been verify
    res.render('noti/verify_email', {
        msg: 'Chào mừng bạn đã đến với Travel Itinerary. Chúng tôi đã gửi một email xác nhận đến tài khoản của bạn, bạn cần xác nhận email trước khi có thể tiếp tục sử dụng dịch vụ của chúng tôi.'
    });
});

router.get('/verify', async function(req,res) {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id == rand)
        {
            console.log("Email is verified");
            const result = await userDb.insert_user(user_ins);
            if (result === false) {
                res.render('error/500');
            }

            res.render('noti/verify_email', {
                msg: `Chúc mừng ${mailOptions.to} đã xác thực tài khoản thành công. Bạn có thể đăng nhập để tiếp tục, chúc bạn có được những trải nghiệm tốt nhất với trang web của chúng tôi.`
            });
        }
        else
        {
            //verify id is not correct
            res.render('error/404');
        }
    }
    else {
        res.end("Request is from unknown source");
    }
});

//google sign in and sign up
router.get('/google-sign-in', async function(req, res) {
    var email = req.query.email;

    var user = await userDb.select_user_by_email(email);

    if (user == false) {
        res.render('error/500');
        return;
    }

    //if this email not exists in the db
    if (user == undefined) {
        console.log(undefined);
        res.json('sign-up');
        return;
    }

    //if this email is exists but not by google
    if (user.google != 1) {
        res.json('exists');
        return;
    }

    req.session.auth = true;
    req.session.authUser = user;
    const url = req.session.retUrl || '/';
    res.json('sign-in');
})

router.get('/google-sign-up', async function(req, res) {
    var user = {
        "username": req.query.username,
        "email": req.query.email,
        "password": null,
        "fullname": null,
        "dob": Infinity,
        "type": 'user',
        "google": 1
    }

    console.log('Google user: ' + user);
    const result = await userDb.insert_user(user);

    if (result === false) {
        res.render('error/500');
    }

    req.session.auth = true;
    req.session.authUser = user;
    const url = req.session.retUrl || '/';
    res.json('success');
});

//validate router
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