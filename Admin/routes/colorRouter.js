const colorController = require('../controllers/colorController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//Server side
//GET all colors
// router.get('/allColors', isAdmin, colorController.getAllColors)

//ADD one color
router.post('/', isAdmin, colorController.addColor)

//UPDATE color
router.put('/:id', isAdmin, colorController.updateColor)

//DELETE color
router.delete('/:id', isAdmin, colorController.deleteColor)

router.get('/', isAdmin, colorController.getColorPage)

module.exports = router