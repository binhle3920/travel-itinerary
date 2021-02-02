var express = require('express');
var router = express.Router();
var moment = require('moment');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var email_config = require('../config/config.json').mail;

var userDb = require('../models/user.model');

//config email
var user_ins = null, host, rand;
var fullname, dob, psw, email, user;
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: email_config
});

router.get('/', function(req, res) {
    console.log(req.session.authUser);

    res.render('profile/profile', {
        user: req.session.authUser,
        moment: moment,
    });
})  

router.post('/edit', async function (req,res) {
    user = req.session.authUser;

    fullname = req.body.fullname;
    dob = req.body.dob;
    psw = null;
    email = null;

    //if user is not google account
    if (req.session.authUser.google != 1) {
        //if email is changed
        psw = req.body.password;
        email = req.body.email;

        if (email != user.email) {
            rand = Math.floor((Math.random() * 100) + 54);
            host=req.get('host');
            var link = "http://"+req.get('host')+"/profile/verify?id=" + rand;
            mailOptions = {
                to : email,
                subject : "Please confirm your Email account on Travel Itinerary",
                html : `Hello ${user.username}, <br>
                Please click on the link to verify your email. <br>
                <a href="${link}"><button style="padding: 20px; background-color: black; color: white">Click here to verify</button></a>`
            }
    
            smtpTransport.sendMail(mailOptions, function(error, response) {
                if(error){
                    res.render('error/500');
                    return;
                } else {
                    console.log("Message sent: " + response.message);
                    res.end("sent");
                }
            });
        
            //render page to noti email has been verify
            res.render('noti/verify_email', {
                msg: 'Bạn vừa thay đổi địa chỉ email của mình, vì vậy bạn cần phải xác nhận lại email này. Chúng tôi đã gửi một email xác nhận đến tài khoản của bạn, bạn cần xác nhận email trước khi có thể tiếp tục sử dụng dịch vụ của chúng tôi.'
            });
            return;
        }
    }

    console.log('Update username information')
    //if email is not change and account is google  or not google
    //update fullname
    user.fullname = fullname;
    var result = await userDb.update_fullname(user.username, fullname);
    if (result == false) {
        res.render('error/500');
        return;
    }

    //update dob
    user.dob = dob;
    result = await userDb.update_dob(user.username, dob);
    if (result == false) {
        res.render('error/500');
        return;
    }

    //update password
    if (psw != false) {
        const salt = bcrypt.genSaltSync(10);
        var hash_psw = bcrypt.hashSync(psw, salt);
        
        user.password = hash_psw;
        result = await userDb.update_password(user.username, hash_psw)
        if (result == false) {
            res.render('error/500');
            return;
        }    
    }

    
    req.session.authUser = user;
    console.log(req.session.authUser);
    const url = req.session.retUrl || '/';
    res.redirect('back');
})

router.get('/verify', async function(req,res) {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id == rand)
        {
            console.log("Email is verified");
            if (result === false) {
                res.render('error/500');
            }

            //update fullname
            user.fullname = fullname;
            var result = await userDb.update_fullname(user.username, fullname);
            if (result == false) {
                res.render('error/500');
                return;
            }

            //update dob
            user.dob = dob;
            result = await userDb.update_dob(user.username, dob);
            if (result == false) {
                res.render('error/500');
                return;
            }

            //update password
            if (psw != false) {
                const salt = bcrypt.genSaltSync(10);
                var hash_psw = bcrypt.hashSync(psw, salt);
                
                result = await userDb.update_password(user.username, hash_psw);
                if (result == false) {
                    res.render('error/500');
                    return;
                }    
            }

            //update email
            user.email = email;
            result = await userDb.update_email(user.username, email);
            if (result == false) {
                res.render('error/500');
                return;
            }    
            
            req.session.authUser = user;
            const url = req.session.retUrl || '/';
            res.render('noti/verify_email', {
                msg: `Chúc mừng ${mailOptions.to} đã xác thực tài khoản thành công. Thông tin tài khoản của bạn đã được cập nhập thành công.`
            });
        }
        else
        {
            //verify id is not correct
            res.render('error/404');
            return;
        }
    }
    else {
        res.end("Request is from unknown source");
    }
});

router.get('/check-password', function(req, res) {
    res.json(bcrypt.compareSync(req.query.psw, req.session.authUser.password))
})

module.exports = router;