const orderController = require('../controllers/orderController')
const router = require('express').Router()

//Server side
//CREATE order
router.post('/order/:cartID', orderController.createOrder)

//Client side
router.get('/order', orderController.getOrderPage)

module.exports = router