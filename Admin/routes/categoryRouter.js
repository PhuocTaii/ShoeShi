const categoryController = require('../controllers/categoryController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//GET all categories
// router.get('/', isAdmin, categoryController.getAllCategories)

//Server side
// GET a category by id
router.get('/:id', isAdmin, categoryController.getCategoryById)

// ADD a category
router.post('/', isAdmin, categoryController.addCategory)

// UPDATE a category by id
router.put('/:id', isAdmin, categoryController.updateCategory)

// DELETE a category by id
router.delete('/:id', isAdmin, categoryController.deleteCategory)

//Client side
router.get('/', isAdmin, categoryController.getCategoriesManufacturersPage)

module.exports = router
