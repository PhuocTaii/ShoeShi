const Size = require('../models/size')

const sizeService = {
  getAllSizes() {
    const sizes = Size.find()
    return sizes
  },

  getSizeById(id) {
    const foundSize = Size.findById(id)
    return foundSize
  },


  getSizeByNumber(size) {
    const foundSize = Size.findOne({ size: size })
    return foundSize
  },

  getSizeById(id) {
    const foundSize = Size.findById(id)
    return foundSize
  },
}

module.exports = sizeService
