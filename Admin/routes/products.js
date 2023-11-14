const express = require('express');
const router = express.Router();

/* GET categories page. */
router.get('/', function(req, res, next) {
  res.render('products/index', {extraStyles: 'products.css'});
});

module.exports = router;
