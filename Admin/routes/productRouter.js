const productController = require('../controllers/productController')
const router = require('express').Router()

//GET all products
router.get('/', productController.getAllProducts)

//ADD one product
router.post('/', productController.addProduct)

//MODIFY product
router.put('/:id', productController.updateProduct)

//DELETE product
router.delete('/:id', productController.deleteProduct)

//Client side
// router.get('/products', productController.getAdminProductPage)

module.exports = router
