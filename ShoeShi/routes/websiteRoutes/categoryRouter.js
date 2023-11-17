const express = require('express')
const router = express.Router()

/* ADMIN */
/* GET categories page. */
router.get('/admin/categories-manufacturers', function (req, res, next) {
  res.render('admin/categories', {
    layout: 'admin/layout/main',
    extraStyles: 'category.css',
  })
})

module.exports = router
