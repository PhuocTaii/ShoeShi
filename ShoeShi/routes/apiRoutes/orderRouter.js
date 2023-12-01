const orderController = require('../../controllers/orderController')
const router = require('express').Router()

router.post('/order/:cartID', orderController.createOrder)
router.get('/order', orderController.getAllOrders)
router.get('/order/:id', orderController.getOrderById)
router.put('/order/:id', orderController.updateOrder)
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router
