const express = require('express')
const { isAdmin } = require('../../middleware/authenticationMiddleware')
const router = express.Router()

/* CUSTOMER */
/* GET products page. */
router.get('/products', function (req, res, next) {
  res.render('customer/productList', {
    layout: 'customer/layout/main',
    extraStyles: 'productList.css',
  })
})

/* GET product detail page. */
router.get('/productDetail', function (req, res, next) {
  res.render('customer/productDetail', {
    layout: 'customer/layout/main',
    extraStyles: 'productDetail.css',
  })
})

/* GET products page. */
router.get('/admin/products', isAdmin, function (req, res, next) {
  res.render('admin/products', {
    layout: 'admin/layout/main',
    extraStyles: 'products.css',
  })
})

module.exports = router
