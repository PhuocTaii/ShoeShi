const manufacturerController = require('../../controllers/manufacturerController')
const router = require('express').Router()

//GET all manufacturers
router.get('/admin/getmanufacturer', manufacturerController.getAllManufacturers)

//ADD one manufacturer
router.post('/admin/addmanufacturer', manufacturerController.addManufacturer)

//DELETE manufacturer
router.delete(
  '/admin/deletemanufacturer/:id',
  manufacturerController.deleteManufacturer
)

module.exports = router
