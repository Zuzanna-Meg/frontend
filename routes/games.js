var express = require('express');
var https = require('https');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), async (req, res) => {
  var games = await getGames();
  var members = await getMembers();
  res.render('games', { title: "Games | UUSUDND", games, members });
});

async function getGames() {

  const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/game", {
      method: "GET"
  });

  const result = await response.json();
  return result;
  
}

async function getMembers() {

    const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/member", {
        method: "GET"
    });
  
    const result = await response.json();
    return result; 
    
  }

module.exports = router;