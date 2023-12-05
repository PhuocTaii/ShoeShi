const productController = require('../../controllers/productController')
const router = require('express').Router()

//GET all products
router.get('/product', productController.getAllProducts)

//Filter products
router.get('/products/filter', productController.getProductByFilter)

//Sort products
router.get('/products/sort', productController.sortProducts)

//Get related products
router.get('/products/related/:id', productController.getRelatedProducts)

//Client side
router.get('/products', productController.getProductPage)

router.get('/productDetail', productController.getProductDetailPage)

module.exports = router
