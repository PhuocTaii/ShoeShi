const orderController = require('../controllers/orderController')
const router = require('express').Router()

router.get('/order', orderController.getAllOrders)

router.get('/order/:id', orderController.getOrderById)

router.put('/order/:id', orderController.updateOrder)

router.delete('/order/:id', orderController.deleteOrder)

router.get('/orders', orderController.getAdminOrderPage)
  

module.exports = router
