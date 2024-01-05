const userService = require('../services/userService')
const productService = require('../services/productService')
const orderService = require('../services/orderService')
const cartService = require('../services/cartService')
const colorService = require('../services/colorService')

const orderController = {
  getOrderById: async (req, res) => {
    try {
      const order = await orderService.getOrderById(req.params.id)
      const processItemColor = async (color) => {
        const colorInfo = await colorService.findColorByName(color);
        return colorInfo.colorCode;
      };
      const formattedOrder = {
        orderId: order._id,
        date: order.orderTime,
        status: order.status,
        address: order.address,
        totalPrice: order.totalPrice,
        items:
        order.productList && Array.isArray(order.productList)
          ? await Promise.all(order.productList.map(async (item) => ({
              itemName: item.product,
              itemPrice: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              itemQuantity: item.quantity,
              itemSize: item.size,
              itemColor: await processItemColor(item.color),
            })))
          : [],
      }
      console.log(formattedOrder)
      return res.status(200).json(formattedOrder)
    } catch (error) {
      throw new Error('Failed to fetch order')
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
            }))
          : [],
      totalPrice: order.totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    }))

    const user = await userService.getUserById(req.user.id) 
    const cart = await cartService.getOneCart(req.user.id);
    const prodList = await cartService.getProductList(cart)

    res.render('order', {
      layout: 'main',
      extraStyles: 'order.css',
      formattedOrders,
      user,
      prodList
    })
  },
}
module.exports = orderController
