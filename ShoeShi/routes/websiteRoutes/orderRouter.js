const express = require('express')
const router = express.Router()

/* GET orders page. */
router.get('/orders', function (req, res, next) {
  res.render('customer/order', {
    layout: 'customer/layout/main',
    extraStyles: 'order.css',
  })
})

/* GET orders page for admin. */
router.get('/admin/orders', function (req, res, next) {
  res.render('admin/orders', {
    layout: 'admin/layout/main',
    extraStyles: 'order.css',
  })
})

module.exports = router
