var express = require('express');
var https = require('https');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

/* GET admin page. */
router.get('/', requiresAuth(), (req, res) => {
    res.render('admin', { title: "Admin Dashboard | UUSUDND" });
});

module.exports = router;