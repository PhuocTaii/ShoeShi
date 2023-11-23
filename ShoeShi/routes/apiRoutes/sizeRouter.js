const sizeController = require('../../controllers/sizeController')
const router = require('express').Router()

//GET all sizes
router.get('/admin/sizes', sizeController.getAllSizes)

// GET a size by id
router.get('/admin/size/:id', sizeController.getSizeById)

// ADD a size
router.post('/admin/size', sizeController.addSize)

// UPDATE a size by id
router.put('/admin/size/:id', sizeController.updateSize)

// DELETE a size by id
router.delete('/admin/size/:id', sizeController.deleteSize)

module.exports = router
