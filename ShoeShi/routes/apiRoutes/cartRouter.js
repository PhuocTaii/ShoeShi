const cartController = require('../../controllers/cartController')
const router = require('express').Router()

//GET all carts
router.get('/admin/cart', cartController.getAllCarts)

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

//DELETE cart
router.delete('/cart/deletecart/:customerId', cartController.deleteCart)

module.exports = router
