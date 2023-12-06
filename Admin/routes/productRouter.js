const productController = require('../controllers/productController')
const router = require('express').Router()

//GET all products
router.get('/product', productController.getAllProducts)

//ADD one product
router.post('/product', productController.addProduct)

//MODIFY product
router.put('/product/:id', productController.updateProduct)

//DELETE product
router.delete('/product/:id', productController.deleteProduct)

//Client side
router.get('/products', productController.getAdminProductPage)

module.exports = router
