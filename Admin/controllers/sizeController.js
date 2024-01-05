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

  // ADD a size
  addSize: async (req, res) => {
    try {
      const size = await sizeService.addSize(req.body)
      const sizes = await sizeService.getAllSizes()
      res.status(200).json(sizes)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // UPDATE a size by id
  updateSize: async (req, res) => {
    try {
      const foundSize = await sizeService.updateSize(req.params.id, req.body)
      if (!foundSize) {
        return res.status(404).json('Size not found')
      }
      const sizes = await sizeService.getAllSizes()
      res.status(200).json(sizes)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // DELETE a size by id
  deleteSize: async (req, res) => {
    try {
      const foundSize = await sizeService.deleteSize(req.params.id)
      if (!foundSize) {
        return res.status(404).json('Size not found')
      }
      const sizes = await sizeService.getAllSizes()
      res.status(200).json(sizes)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = sizeController
