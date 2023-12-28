const orderController = require('../controllers/orderController')
const { isAuth } = require('../middleware/authenticationMiddleware')
const router = require('express').Router()

//Client side
router.get('/', isAuth, orderController.getOrderPage)

router.get('/:id', isAuth, orderController.getOrderById)

module.exports = router