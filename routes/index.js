var express = require('express');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  var data = await getEvents();
  var new_data = data.map(item => formatDate(item));
  res.render('index', { title: "Home | UUSUDND", events: new_data });
});

function formatDate(item) {
  var date = new Date(item.start);
  item.start = date.toLocaleString();
  return item;
}

async function getEvents() {

  const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/event", {
      method: "GET"
  });

  const result = await response.json();
  return result; 
  
}

module.exports = router;
