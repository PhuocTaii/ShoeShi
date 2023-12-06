const sizeService = require('../services/sizeService')

const sizeController = {
  //GET all sizes
  getAllSizes: async (req, res) => {
    try {
      const sizes = await sizeService.getAllSizes()
      res.status(200).json(sizes)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // GET a size by id
  getSizeById: async (req, res) => {
    try {
      const foundSize = await sizeService.getSizeById(req.params.id)
      if (!foundSize) {
        return res.status(404).json('Size not found')
      }
      res.status(200).json(foundSize)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = sizeController
