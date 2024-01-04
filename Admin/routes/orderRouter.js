const orderController = require('../controllers/orderController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

router.get('/allOrders', isAdmin, orderController.getAllOrders)

router.get('/search', isAdmin, orderController.getAllOrderByFilter)

router.get('/:id', isAdmin, orderController.getOrderById)

router.put('/:id', isAdmin, orderController.updateOrder)

router.delete('/:id', isAdmin, orderController.deleteOrder)

router.get('/', isAdmin, orderController.getAdminOrderPage)
  

module.exports = router
