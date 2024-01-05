const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')

const colorController = {
  //GET all colors
  getAllColors: async (req, res) => {
    try {
      const colors = await colorService.getAllColors()
      res.status(200).json(colors)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD color
  addColor: async (req, res) => {
    try {
      const savedColor = await colorService.addColor(req.body)
      const colors = await colorService.getAllColors()
      res.status(200).json(colors)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //UPDATE color
  updateColor: async (req, res) => {
    try {
      const updatedColor = await colorService.updateColor(req.params.id, req.body)
      const colors = await colorService.getAllColors()
      res.status(200).json(updatedColor)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE color
  deleteColor: async (req, res) => {
    try {
      const color = await colorService.deleteColor(req.params.id)
      if (!color) {
        res.status(500).json(err)
      }
      const colors = await colorService.getAllColors()
      res.status(200).json(colors)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getColorPage: async(req, res) => {
    try {
      const acceptHeader = req.get('Accept');
      if (acceptHeader && acceptHeader.includes('application/json')) {
        const colors = await colorService.getAllColors()
        res.status(200).json(colors)
      } else{
        res.render('colors-sizes', {
          layout: 'main',
          extraStyles: 'color-size.css',
          user: req.user
        })
      }      
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
module.exports = colorController
