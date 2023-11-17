const express = require('express')
const router = express.Router()

/* CUSTOMER */
/* GET products page. */
router.get('/products', function (req, res, next) {
  res.render('customer/productList', {
    layout: 'customer/layout/main',
    extraStyles: 'productList.css',
  })
})

/* GET products page. */
router.get('/admin/products', function (req, res, next) {
  res.render('admin/products', {
    layout: 'admin/layout/main',
    extraStyles: 'products.css',
  })
})

module.exports = router
