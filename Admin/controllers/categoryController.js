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

  // ADD a category
  addCategory: async (req, res) => {
    try {
      const category = await categoryService.addCategory(req.body)
      res.status(200).json(category)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // UPDATE a category by id
  updateCategory: async (req, res) => {
    try {
      const foundCate = await categoryService.updateCategory(
        req.params.id,
        req.body
      )
      if (!foundCate) {
        return res.status(404).json('Category not found')
      }
      res.status(200).json(foundCate)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // DELETE a category by id
  deleteCategory: async (req, res) => {
    try {
      const foundCate = await categoryService.deleteCategory(req.params.id)
      if (!foundCate) {
        return res.status(404).json('Category not found')
      }
      res.status(200).json(foundCate)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //Client side
  getCategoriesManufacturersPage: async(req, res) => {
    try{
      const acceptHeader = req.get('Accept');
      if (acceptHeader && acceptHeader.includes('application/json')) {
        const categories = await categoryService.getAllCategories()
        res.status(200).json(categories)
      }
      else{
        res.render('categories', {
          layout: 'main',
          extraStyles: 'category.css',
        })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = categoryController