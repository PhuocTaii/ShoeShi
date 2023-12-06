const categoryController = require('../controllers/categoryController')
const router = require('express').Router()

//GET all categories
router.get('/categories', categoryController.getAllCategories)

//Server side
// GET a category by id
router.get('/category/:id', categoryController.getCategoryById)

// ADD a category
router.post('/category', categoryController.addCategory)

// UPDATE a category by id
router.put('/category/:id', categoryController.updateCategory)

// DELETE a category by id
router.delete('/category/:id', categoryController.deleteCategory)

//Client side
router.get('/categories-manufacturers',categoryController.getCategoriesManufacturersPage)

module.exports = router
