const express = require('express')
const router = express.Router()

/* ADMIN */
/* GET categories page. */
router.get('/admin/colors-sizes', function (req, res, next) {
  res.render('admin/colors-sizes', {
    layout: 'admin/layout/main',
    extraStyles: 'color-size.css',
  })
})

module.exports = router
