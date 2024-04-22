var express = require('express');
var https = require('https');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), async (req, res) => {
  var funds = await getFunds();
  funds.forEach(item => {
    item.date = new Date(item.date)
  });
  funds.sort((a, b) => a.date - b.date);
  funds.forEach(item => {
    item.date = item.date.toDateString()
  });
  res.render('funds', { title: "Funds | UUSUDND", funds });
});

async function getFunds() {

  const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/budget", {
      method: "GET"
  });

  const result = await response.json();
  return result;

}

module.exports = router;