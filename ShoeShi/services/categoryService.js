const Category = require('../models/category')

const categoryService = {
  getAllCategories() {
    const cates = Category.find()
    return cates
  },

  getCategoryById(id) {
    const foundCate = Category.findById(id)
    return foundCate
  },

  addCategory(newCategory) {
    const category = new Category(newCategory)
    return category.save()
  },

  updateCategory(id, category) {
    const foundCate = Category.findByIdAndUpdate(id, category)
    return foundCate
  },

  deleteCategory(id) {
    const foundCate = Category.findByIdAndDelete(id)
    return foundCate
  },
  getCategoryByName(name) {
    const foundCate = Category.findOne({ name: name })
    return foundCate
  },
}

module.exports = categoryService
