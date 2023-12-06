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
}
module.exports = colorController
