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

  var url = 'https://uusudnd-api.azurewebsites.net/api/v1/event';

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        resolve(body);
      });
      res.on('error', (error) => {
        reject(error);
      })
    });
  });
  
}

module.exports = router;
