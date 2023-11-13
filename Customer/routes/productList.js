const express = require('express');
const router = express.Router();

/* GET accounts page. */
router.get('/', function(req, res, next) {
  res.render('product/productList', {extraStyles: 'productList.css'});
});

module.exports = router;
