const cartController = require('../controllers/cartController')
const router = require('express').Router()

//GET local cart
router.post('/local', cartController.getLocalCart)

//ADD product to cart
router.post('/:productID', cartController.addProductToCart)

//UPDATE quantity of product
router.put(
  '/updateproduct/:customerId/:productId',
  cartController.changeProductQuantity
)

//DELETE product from cart
router.delete(
  '/deleteproduct/:customerId/:productId',
  cartController.deleteProductFromCart
)

router.get('/', cartController.getCartPage)

module.exports = router
