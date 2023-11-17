const express = require('express')
const router = express.Router()

/* CUSTOMER */
/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('customer/login', {
    layout: 'customer/layout/auth',
    extraStyles: 'login.css',
  })
})

/* GET sign up page. */
router.get('/signup', function (req, res, next) {
  res.render('customer/signup', {
    layout: 'customer/layout/auth',
    extraStyles: 'signup.css',
  })
})

/* ADMIN */
/* GET login page. */
router.get('/admin/login', function (req, res, next) {
  res.render('admin/auth', { layout: 'admin/layout/auth' })
})

module.exports = router
