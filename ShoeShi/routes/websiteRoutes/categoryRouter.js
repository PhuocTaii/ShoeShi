const express = require('express')
const router = express.Router()
const { isAdmin } = require('../../middleware/authenticationMiddleware')

/* ADMIN */
/* GET categories page. */
router.get('/admin/categories-manufacturers', isAdmin , function (req, res, next) {
  res.render('admin/categories', {
    layout: 'admin/layout/main',
    extraStyles: 'category.css',
  })
})

module.exports = router
