const colorController = require('../controllers/colorController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//Server side
//GET all colors
// router.get('/', isAdmin, colorController.getAllColors)

//ADD one color
router.post('/', isAdmin, colorController.addColor)

//DELETE color
router.delete('/:id', isAdmin, colorController.deleteColor)

router.get('/', isAdmin, colorController.getColorPage)

module.exports = router