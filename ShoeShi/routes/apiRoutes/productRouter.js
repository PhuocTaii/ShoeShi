const productController = require('../../controllers/productController')
const router = require('express').Router()

//GET all products
router.get('/product', productController.getAllProducts)

//ADD one product
router.post('/admin/product', productController.addProduct)

//MODIFY product
router.put('/admin/product/:id', productController.updateProduct)

//DELETE product
router.delete('/admin/product/:id', productController.deleteProduct)

module.exports = router
