const express = require('express')
const router = express.Router()

/* GET accounts page. */
router.get('/profile', function (req, res, next) {
  res.render('customer/profile', {
    layout: 'customer/layout/main',
    extraStyles: 'profile.css',
  })
})

module.exports = router
