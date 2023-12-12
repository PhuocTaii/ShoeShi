const productController = require('../controllers/productController')
const router = require('express').Router()
const {isAuth, isAdmin} = require('../middleware/authenticationMiddleware')

//GET all products
router.get('/', productController.getAllProducts)

router.get('/:id', productController.getProductDetail)

//Filter products
router.get('/filter', productController.getProductByFilter)

//Sort products
router.get('/sort', productController.sortProducts)

//Get related products
router.get('/related/:id', productController.getRelatedProducts)


module.exports = router
