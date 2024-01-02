const manufacturerController = require('../controllers/manufacturerController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//GET all manufacturers
router.get('/', isAdmin, manufacturerController.getAllManufacturers)

//ADD one manufacturer
router.post('/', isAdmin, manufacturerController.addManufacturer)

//DELETE manufacturer
router.delete('/:id', isAdmin, manufacturerController.deleteManufacturer)

module.exports = router
