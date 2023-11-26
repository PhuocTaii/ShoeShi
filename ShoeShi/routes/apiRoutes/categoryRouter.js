const categoryController = require('../../controllers/categoryController')
const router = require('express').Router()

//GET all categories
router.get('/admin/categories', categoryController.getAllCategories)

// GET a category by id
router.get('/admin/category/:id', categoryController.getCategoryById)

// ADD a category
router.post('/admin/category', categoryController.addCategory)

// UPDATE a category by id
router.put('/admin/category/:id', categoryController.updateCategory)

// DELETE a category by id
router.delete('/admin/category/:id', categoryController.deleteCategory)

module.exports = router
