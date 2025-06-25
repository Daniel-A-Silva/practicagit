var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('visitanos'); // o lo que quieras renderizar
});

module.exports = router; // ✅ MUY IMPORTANTE




