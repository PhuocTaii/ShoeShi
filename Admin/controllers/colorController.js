const colorService = require('../services/colorService')

const colorController = {
  //GET all colors
  getAllColors: async (req, res) => {
    try {
      const colors = await colorService.getAllColors()
      if (!colors) {
        return res.status(500).json(err)
      }
      res.status(200).json(colors)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD color
  addColor: async (req, res) => {
    try {
      const savedColor = await colorService.addColor(req.body)
      res.status(200).json(savedColor)
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
      res.status(200).json('The color has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getColorPage: async(req, res) => {
    res.render('colors-sizes', {
      layout: 'main',
      extraStyles: 'color-size.css',
    })
  }
}
module.exports = colorController
