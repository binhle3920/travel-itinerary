var auth = require('../middlewares/auth.mdw')

module.exports = function (app) {
    //handle homepage
    app.use('/', require('../routes/index.route'));
    //handle sign in and sign up
    app.use('/authen', auth.isNotLogin, require('../routes/authen.route'));
    //handle profile page
    app.use('/profile', auth.isLogin, require('../routes/profile.route'));

    //handle plan page
    app.use('/itinerary', require('../routes/index.route'));

    app.use(function (req, res) {
        // render the error page
        res.render('error/404');
    });
}