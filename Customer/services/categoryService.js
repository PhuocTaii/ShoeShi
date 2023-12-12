const Category = require('../models/category')

const categoryService = {
  getAllCategories() {
    const cates = Category.find().lean()
    return cates
  },

  getCategoryById(id) {
    const foundCate = Category.findById(id)
    return foundCate
  },

  getCategoryByName(name) {
    const foundCate = Category.findOne({ name: name })
    return foundCate
  },
}

module.exports = categoryService
