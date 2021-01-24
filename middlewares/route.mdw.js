module.exports = function (app) {
    //handle homepage
    app.use('/', require('../routes/index.route'));
    //handle sign in and sign up
    app.use('/authen', require('../routes/authen.route'));

    app.use(function (req, res) {
        // render the error page
        res.status(err.status || 404);
        res.render('error');
    });
}