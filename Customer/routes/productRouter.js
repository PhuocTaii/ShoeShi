const productController = require('../controllers/productController')
const router = require('express').Router()
const {isAuth, isAdmin} = require('../middleware/authenticationMiddleware')

//GET all products
router.get('/', productController.getAllProducts)

router.get('/:id', productController.getProductDetail)

//Get related products
router.get('/related/:id', productController.getRelatedProducts)

module.exports = router
