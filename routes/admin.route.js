var express = require('express');
var router = express.Router();

router.get('/manage', function(req, res) {
    var manage = req.query.value;

    res.render('admin/admin', {
        manage: manage
    });
})

module.exports = router;