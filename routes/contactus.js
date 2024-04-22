var express = require('express');
var https = require('https');
var router = express.Router();

router.get('/', async (req, res) => {
  res.render('contactus', { title: "Contact Us | UUSUDND" });
});

module.exports = router;