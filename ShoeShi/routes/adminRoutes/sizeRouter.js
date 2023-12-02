const sizeController = require('../../controllers/sizeController')
const router = require('express').Router()

//GET all sizes
router.get('/sizes', sizeController.getAllSizes)

// GET a size by id
router.get('/size/:id', sizeController.getSizeById)

// ADD a size
router.post('/size', sizeController.addSize)

// UPDATE a size by id
router.put('/size/:id', sizeController.updateSize)

// DELETE a size by id
router.delete('/size/:id', sizeController.deleteSize)

module.exports = router
