var express = require('express');
var https = require('https');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/:id', requiresAuth(), async (req, res) => {
  var member = await getMember(req.params.id);
  if (member.name == null) {
    res.render('error', { message: 'Member not found', error: {status: 404}})
  }
  res.render('memberinfo', { title: "Member Details | UUSUDND", member });
});

async function getMember(id) {

  const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/member/"+id, {
      method: "GET"
  });

  const result = await response.json();
  return result; 
}

module.exports = router;