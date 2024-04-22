var express = require('express');
var https = require('https');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/:id', requiresAuth(), async (req, res) => {
  var game = await getGame(req.params.id);
  if (game.name == null) {
    res.render('error', { message: 'Member not found', error: {status: 404}})
  }
  var members = await getMembers();
  res.render('gameinfo', { title: "Game Details | UUSUDND", game, members });
});

async function getGame(id) {

  const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/game/"+id, {
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