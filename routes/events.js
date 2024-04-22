var express = require('express');
const { requiresAuth } = require('express-openid-connect');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', requiresAuth(), async function (req, res, next) {
  var events = await getEvents();
  res.render('events', { title: "Events | UUSUDND", events });
});

async function getEvents() {

    const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/event", {
        method: "GET"
    });
  
    const result = await response.json();
    return result; 
    
  }

module.exports = router;