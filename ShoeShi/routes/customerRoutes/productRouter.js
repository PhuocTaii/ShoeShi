const productController = require('../../controllers/productController')
const router = require('express').Router()
const {isAuth, isAdmin} = require('../../middleware/authenticationMiddleware')

//GET all products
router.get('/products', productController.getAllProducts)

router.get('/product/:id', productController.getProductDetail)

router.post('/product/:id/review', isAuth, productController.addReview)

//Filter products
router.get('/products/filter', productController.getProductByFilter)

//Sort products
router.get('/products/sort', productController.sortProducts)

//Get related products
router.get('/products/related/:id', productController.getRelatedProducts)

//Client side
// router.get('/products', productController.getProductPage)

// router.get('/productDetail', productController.getProductDetailPage)

module.exports = router
