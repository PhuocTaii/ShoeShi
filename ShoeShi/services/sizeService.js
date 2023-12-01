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

  addSize(newSize) {
    const size = new Size(newSize)
    return size.save()
  },

  updateSize(id, size) {
    const foundSize = Size.findByIdAndUpdate(id, size)
    return foundSize
  },

  deleteSize(id) {
    const foundSize = Size.findByIdAndDelete(id)
    return foundSize
  },
  
  getSizeByNumber(size){
    const foundSize = Size.findOne({size: size})
    return foundSize
  },

  getSizeById(id){
    const foundSize = Size.findById(id)
    return foundSize
  }
}

module.exports = sizeService
