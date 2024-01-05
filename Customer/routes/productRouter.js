const productController = require('../controllers/productController')
const router = require('express').Router()

//GET all products
router.get('/productData', productController.getAllProducts)

router.get('/', productController.getProductPage)

router.get('/:id', productController.getProductDetail)

//Get related products
router.get('/related/:id', productController.getRelatedProducts)

module.exports = router
