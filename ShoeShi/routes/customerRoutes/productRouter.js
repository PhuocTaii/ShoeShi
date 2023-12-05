const productController = require('../../controllers/productController')
const router = require('express').Router()
const {isAuth, isAdmin} = require('../../middleware/authenticationMiddleware')

//GET all products
router.get('/products', productController.getAllProducts)

router.get('/product/:id', productController.getProductDetail)

router.post('/product/:id/review', isAuth, productController.addReview)

//Client side
// router.get('/products', productController.getProductPage)

// router.get('/productDetail', productController.getProductDetailPage)

module.exports = router
