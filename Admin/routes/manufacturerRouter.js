const manufacturerController = require('../controllers/manufacturerController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')



// GET all manufacturers
router.get('/',isAdmin, manufacturerController.getAllManufacturers);

// GET a manufacturer by id
router.get('//:id',isAdmin, manufacturerController.getManufacturerById);

// ADD a manufacturer
router.post('/',isAdmin, manufacturerController.addManufacturer);

// UPDATE a manufacturer by id
router.put('/:id',isAdmin, manufacturerController.updateManufacturer);

// DELETE a manufacturer by id
router.delete('/:id',isAdmin, manufacturerController.deleteManufacturer);

module.exports = router
