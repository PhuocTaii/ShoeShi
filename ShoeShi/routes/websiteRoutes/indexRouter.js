const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('customer/index', {
    extraStyles: 'home.css',
    layout: 'customer/layout/main',
  })
})

/* GET dashboard page. */
router.get('/admin', function (req, res, next) {
  res.render('admin/index', {
    extraStyles: 'dashboard.css',
    layout: 'admin/layout/main',
  })
})

module.exports = router
