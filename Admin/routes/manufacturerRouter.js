const manufacturerController = require('../controllers/manufacturerController')
const router = require('express').Router()


// GET all manufacturers
router.get('/manufacturers', manufacturerController.getAllManufacturers);

// GET a manufacturer by id
router.get('/manufacturer/:id', manufacturerController.getManufacturerById);

// ADD a manufacturer
router.post('/manufacturer', manufacturerController.addManufacturer);

// UPDATE a manufacturer by id
router.put('/manufacturer/:id', manufacturerController.updateManufacturer);

// DELETE a manufacturer by id
router.delete('/manufacturer/:id', manufacturerController.deleteManufacturer);

module.exports = router
