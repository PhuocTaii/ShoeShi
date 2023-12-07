const orderController = require('../controllers/orderController')
const { isAuth } = require('../middleware/authenticationMiddleware')
const router = require('express').Router()

//Server side
//CREATE order
router.post('/order/:cartID', isAuth ,orderController.createOrder)

//Client side
router.get('/order', isAuth ,orderController.getOrderPage)

module.exports = router