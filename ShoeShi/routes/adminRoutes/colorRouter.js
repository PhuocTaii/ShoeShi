const colorController = require('../../controllers/colorController')
const router = require('express').Router()

//Server side
//GET all colors
router.get('/getcolor', colorController.getAllColors)

//ADD one color
router.post('/addcolor', colorController.addColor)

//DELETE color
router.delete('/deletecolor/:id', colorController.deleteColor)

module.exports = router