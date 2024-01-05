const manufacturerService = require('../services/manufacturerService')

const manufacturerController = {
  //GET all manufacturers
  getAllManufacturers: async (req, res) => {
    try {
      const manufacturers = await manufacturerService.getAllManufacturers()
      if (!manufacturers) {
        return res.status(500).json(err)
      }
      res.status(200).json(manufacturers)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD manufacturer
  addManufacturer: async (req, res) => {
    try {
      const savedManufacturer = await manufacturerService.addManufacturer(
        req.body
      )
      res.status(200).json(savedManufacturer)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE manufacturer
  deleteManufacturer: async (req, res) => {
    try {
      const manufacturer = await manufacturerService.deleteManufacturer(
        req.params.id
      )
      if (!manufacturer) {
        res.status(500).json(err)
      }
      res.status(200).json('The manufacturer has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //UPDATE manufacturer
  updateManufacturer: async (req, res) => {
    try {
      const updatedManufacturer = await manufacturerService.updateManufacturer(
        req.params.id,
        req.body
      )
      if (!updatedManufacturer) {
        res.status(500).json(err)
      }
      res.status(200).json(updatedManufacturer)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getManufacturerById: async (req, res) => {
    try{
      const manufacture = await categoryService.getManufacturerById(req.params.id)
      if (!manufacture) {
        return res.status(404).json('Category not found')
      }
      res.status(200).json(manufacture)
    }catch(err){
      res.status(500).json(err)
    }
  }
}
module.exports = manufacturerController
