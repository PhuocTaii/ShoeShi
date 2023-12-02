const colorController = require('../../controllers/colorController')
const router = require('express').Router()

//GET all colors
router.get('/admin/getcolor', colorController.getAllColors)

//ADD one color
router.post('/admin/addcolor', colorController.addColor)

//DELETE color
router.delete('/admin/deletecolor/:id', colorController.deleteColor)

module.exports = router
