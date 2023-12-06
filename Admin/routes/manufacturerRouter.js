const manufacturerController = require('../controllers/manufacturerController')
const router = require('express').Router()

//GET all manufacturers
router.get('/getmanufacturer', manufacturerController.getAllManufacturers)

//ADD one manufacturer
router.post('/addmanufacturer', manufacturerController.addManufacturer)

//DELETE manufacturer
router.delete(
  '/deletemanufacturer/:id',
  manufacturerController.deleteManufacturer
)

module.exports = router
