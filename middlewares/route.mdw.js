var auth = require('../middlewares/auth.mdw')

module.exports = function (app) {
    //handle homepage
    app.use('/', require('../routes/index.route'));
    //handle sign in and sign up
    app.use('/authen', auth.isNotLogin, require('../routes/authen.route'));
    //handle profile page
    app.use('/profile', auth.isLogin, require('../routes/profile.route'));
    //handle location page
    app.use('/destinations', require('../routes/destinations.route'));
    //handle admin page
    app.use('/admin', auth.isAdmin, require('../routes/admin.route'));
    //handle plan page
    app.use('/plan', auth.isLogin, require('../routes/plan.route'));
    
    app.use(function (req, res) {
        // render the error page
        res.render('error/404');
    });
}