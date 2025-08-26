var express = require('express');
var router = express.Router();
var productosModel = require('../models/productosmodel');

router.get('/', async function(req, res, next) {
  try {
    var productos = await productosModel.getProductos();
    res.render('index', { 
      productos,
      usuario: req.session.nombre || null
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
