const orderService = require('../services/orderService')
const userService = require('../services/userService')
const colorService = require('../services/colorService')

const orderController = {
  // GET all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderService.getAllOrders()
      const user = await userService.getUserById(orders.user)
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // GET an order by id
  getOrderById: async (req, res) => {
    try {
      const order = await orderService.getOrderById(req.params.id) // Implement logic to fetch order by ID from your database
      const user = await userService.getUserById(order.user)
      const processItemColor = async (color) => {
        const colorInfo = await colorService.findColorByName(color);
        return colorInfo.colorCode;
      };
      const formattedOrder = {
        orderId: order._id,
        date: order.orderTime,
        name: order.buyer,
        username: user.username,
        status: order.status,
        address: order.address,
        totalPrice: order.totalPrice,
        phone: order.phone,
        items:
        order.productList && Array.isArray(order.productList)
          ? await Promise.all(order.productList.map(async (item) => ({
              itemName: item.product,
              itemPrice: (item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
              itemQuantity: item.quantity,
              itemSize: item.size,
              itemColor: await processItemColor(item.color),
            })))
          : [],
      }
      return res.status(200).json(formattedOrder) // Return the fetched order
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // PUT update an order
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await orderService.updateOrder(
        req.params.id,
        req.body.capitalizedStatus
      )
      res.status(200).json(updatedOrder)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // DELETE an order
  deleteOrder: async (req, res) => {
    try {
      await orderService.deleteOrder(req.params.id)
      res.status(200).json('Order has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //Client side
  getAdminOrderPage: async (req, res) => {
    try{
      const acceptHeader = req.get('Accept');
      if (acceptHeader && acceptHeader.includes('application/json')) {
        const orders = await orderService.getAllOrders()
        // const user = await userService.getUserById(orders.user)
        res.status(200).json(orders)
      } else{
        res.render('orders', {
          layout: 'main',
          extraStyles: 'order.css',
          user: req.user
        })
      }
    } catch(err){
      res.status(500).json(err)
    }
  },  

  getAllOrderByFilter: async (req, res) => {
    try {
      const orders = await orderService.getAllOrderByFilter(req.query.filterBy)
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = orderController
