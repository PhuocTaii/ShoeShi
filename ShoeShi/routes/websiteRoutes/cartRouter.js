const express = require('express')
const router = express.Router()

/* CUSTOMER */
/* GET cart page. */
router.get('/cart', function (req, res, next) {
  res.render('customer/cart', {
    layout: 'customer/layout/main',
    extraStyles: 'cart.css',
  })
})

module.exports = router
