const Color = require('../models/color')

const colorService = {
  getAllColors() {
    const colors = Color.find()
    return colors
  },

  addColor(color) {
    const newColor = new Color(color)
    const savedColor = newColor.save()
    return savedColor
  },

  deleteColor(id) {
    const color = Color.findByIdAndDelete(id)
    return color
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
