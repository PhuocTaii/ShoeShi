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
}
module.exports = manufacturerController
