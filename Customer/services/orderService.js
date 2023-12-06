const Order = require('../models/order')
const Product = require('../models/product')
const Color = require('../models/color')
const Size = require('../models/size')
const orderService = {
  // Create a new order
  createOrder: async (
    data,
    cart,
    user,
    nameList,
    colorList,
    sizeList,
    priceList,
    TotalPrice
  ) => {
    var productList = []
    for (let i = 0; i < cart.productList.length; i++) {
      productList.push({
        product: nameList[i],
        quantity: cart.productList[i].quantity,
        size: sizeList[i],
        color: colorList[i],
        price: priceList[i],
      })
    }
    const newOrder = new Order({
      productList: productList,
      buyer: user.name,
      address: data.address,
      phone: data.phone,
      totalPrice: TotalPrice,
    })
    const savedOrder = newOrder.save()
    return savedOrder
  },

  // Get an order by id
  getOrderById: async (id) => {
    return await Order.findById(id)
  },

  // Delete an order
  deleteOrder: async (id) => {
    return await Order.findByIdAndDelete(id)
  },
}

module.exports = orderService
