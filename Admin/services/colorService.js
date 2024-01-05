const Color = require('../models/color')

const colorService = {
  getAllColors() {
    const colors = Color.find().lean().sort({ color: 1 })
    return colors
  },

  updateColor(id, newcolor) {
    const update = { color: newcolor.color, colorCode: newcolor.colorCode };
    const color = Color.findByIdAndUpdate(id, update)
    return color 
  },

  addColor(color) {
    const newColor = new Color({
      color: color.color,
      colorCode: color.colorCode,
    })
    console.log(newColor)
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
