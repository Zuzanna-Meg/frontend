var express = require('express');
var https = require('https');
var router = express.Router();

router.get('/', async (req, res) => {
  var games = await getGames();
  res.render('opengames', { title: "Open Games | UUSUDND", games });
});

async function getGames() {

  const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/game", {
      method: "GET"
  });

  const result = await response.json();
  
  opengames = [];
  result.forEach(game => {
    if (game.slots > game.players.length){
        opengames.push(game)
    }
  });

  return opengames;
  
}

module.exports = router;