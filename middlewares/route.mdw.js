module.exports = function (app) {
    app.use('/', require('../routes/index.route'));
    
    app.use(function (req, res) {
        // render the error page
        res.status(err.status || 404);
        res.render('error');
    });
}