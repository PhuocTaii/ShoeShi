const Color = require('../models/color')

const colorService = {
  getAllColors() {
    const colors = Color.find()
    return colors
  },

  findColorByName(name) {
    const color = Color.findOne({ color: name })
    return color
  },

  findColorById(id) {
    const color = Color.findById(id)
    return color
  },
}

module.exports = colorService
