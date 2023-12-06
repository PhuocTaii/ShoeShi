const categoryService = require('../services/categoryService')

const categoryController = {

  //Server side
  //GET all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories()
      res.status(200).json(categories)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // GET a category by id
  getCategoryById: async (req, res) => {
    try {
      const foundCate = await categoryService.getCategoryById(req.params.id)
      if (!foundCate) {
        return res.status(404).json('Category not found')
      }
      res.status(200).json(foundCate)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = categoryController