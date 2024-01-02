const productController = require('../controllers/productController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//GET all products
router.get('/', isAdmin, productController.getAllProducts)

//ADD one product
router.post('/', isAdmin, productController.addProduct)

//MODIFY product
router.put('/:id', productController.updateProduct)

//DELETE product
router.delete('/:id', productController.deleteProduct)

//Client side
// router.get('/products', productController.getAdminProductPage)

module.exports = router
