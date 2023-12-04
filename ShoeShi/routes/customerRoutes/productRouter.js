const productController = require('../../controllers/productController')
const router = require('express').Router()

//GET all products
router.get('/product', productController.getAllProducts)

//Filter products
router.get('/products/filter', productController.getProductByFilter)

//Client side
router.get('/products', productController.getProductPage)

router.get('/productDetail', productController.getProductDetailPage)

module.exports = router
