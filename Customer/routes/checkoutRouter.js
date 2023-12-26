const checkoutController = require('../controllers/checkoutController')
const { isAuth } = require('../middleware/authenticationMiddleware')
const router = require('express').Router()

//Server side
//CREATE order
router.post('/', isAuth, checkoutController.createOrder)

//Client side
router.get('/', isAuth, checkoutController.getCheckoutPage)

module.exports = router