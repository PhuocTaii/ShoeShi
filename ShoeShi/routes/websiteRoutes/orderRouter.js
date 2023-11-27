const express = require('express')
const router = express.Router()

/* GET accounts page. */
router.get('/orders', function (req, res, next) {
  res.render('customer/order', {
    layout: 'customer/layout/main',
    extraStyles: 'order.css',
  })
})

module.exports = router
