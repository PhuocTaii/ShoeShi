const Order = require('../models/order')
// const Product = require('../models/product')
// const Color = require('../models/color')
// const Size = require('../models/size')
const checkoutService = {
  // Create a new order
  createOrder: async (
    data,
    user,
    cart,
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
      buyer: data.name,
      address: data.address,
      phone: data.phone,
      totalPrice: Number(TotalPrice + 20000),
      user: user,
    })
    const savedOrder = newOrder.save()
    return savedOrder
  },

}

module.exports = checkoutService
