const express = require('express')
const { isAdmin } = require('../../middleware/authenticationMiddleware')
const router = express.Router()

/* GET accounts page. */
router.get('/admin/accounts', isAdmin, function (req, res, next) {
  res.render('admin/accounts', {
    layout: 'admin/layout/main',
    extraStyles: 'accounts.css',
  })
})

module.exports = router
