const cartController = require('../../controllers/cartController')
const router = require('express').Router()

//ADD product to cart
router.post('/cart/addproduct/:customerId', cartController.addProductToCart)

//UPDATE quantity of product
router.put(
  '/cart/updateproduct/:customerId/:productId',
  cartController.changeProductQuantity
)

//DELETE product from cart
router.delete(
  '/cart/deleteproduct/:customerId/:productId',
  cartController.deleteProductFromCart
)

router.get('/cart', cartController.getCartPage)

module.exports = router
