module.exports = { 
    isLogin: function (req, res, next) {
      if (req.session.auth === false) {
        req.session.retUrl = req.originalUrl;
        return res.redirect('/authen');
      }
      return next();
    },

    isNotLogin: function(req, res, next) {
        if (req.session.auth === true) {
            return res.redirect('/');
        }

        return next();
    }
}