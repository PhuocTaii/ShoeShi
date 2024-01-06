const productController = require('../controllers/productController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//GET all products
router.get('/api', isAdmin, productController.getAllProducts)

router.get('/', isAdmin, productController.getProductPage)


router.get('/:id', isAdmin, productController.getProductById)

//ADD one product
router.post('/', isAdmin, upload.array('productImage', 10), productController.addProduct)

//MODIFY product
router.put('/:id', isAdmin, upload.array('productImage', 10), productController.updateProduct)

//DELETE product
router.delete('/:id', isAdmin, productController.deleteProduct)

module.exports = router
