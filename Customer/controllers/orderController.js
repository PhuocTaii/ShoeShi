const userService = require('../services/userService')
const productService = require('../services/productService')
const orderService = require('../services/orderService')

const orderController = {
  getOrderById: async (req, res) => {
    try {
      const order = await orderService.getOrderById(req.params.id) // Implement logic to fetch order by ID from your database
      const formattedOrder = {
        orderId: order._id, // Assuming _id is the ID of the order
        date: order.orderTime,
        status: order.status,
        address: order.address,
        totalPrice: order.totalPrice,
        items:
          order.productList && Array.isArray(order.productList)
            ? order.productList.map((item) => ({
                itemName: item.product,
                itemPrice: item.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                itemQuantity: item.quantity,
                itemSize: item.size,
                itemColor: item.color,
                // Other item details you want to display
              }))
            : [], // If items is undefined or not an array, default to an empty array
        totalPrice: order.totalPrice
          ,
        // Add other properties or modify existing ones as needed
      }
      return res.status(200).json(formattedOrder) // Return the fetched order
    } catch (error) {
      throw new Error('Failed to fetch order') // Handle errors or throw custom error messages
    }
  },

  getOrderPage: async (req, res) => {
    const orders = await orderService.getAllOrderById(req.user.id)

    const formattedOrders = orders.map((order) => ({
      status: order.status,
      _id: order._id,
      date: order.orderTime,
      items:
        order.productList && Array.isArray(order.productList)
          ? order.productList.map((item) => ({
              itemName: item.product,
              itemPrice: item.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              // Other item details you want to display
            }))
          : [], // If items is undefined or not an array, default to an empty array
      totalPrice: order.totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      // Add other necessary fields here
    }))

    const user = await userService.getUserById(req.user.id)

    res.render('order', {
      layout: 'main',
      extraStyles: 'order.css',
      formattedOrders,
      user,
    })
  },
}
module.exports = orderController
