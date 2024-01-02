const sizeController = require('../controllers/sizeController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//GET all sizes
router.get('/', isAdmin, sizeController.getAllSizes)

// GET a size by id
router.get('/:id', isAdmin, sizeController.getSizeById)

// ADD a size
router.post('/', isAdmin, sizeController.addSize)

// UPDATE a size by id
router.put('/:id', isAdmin, sizeController.updateSize)

// DELETE a size by id
router.delete('/:id', isAdmin, sizeController.deleteSize)

module.exports = router
