const checkoutService = require('../services/checkoutService')
const cartService = require('../services/cartService')
const userService = require('../services/userService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const productService = require('../services/productService')

const orderController = {
    getOrderPage: async (req, res) => {
        const cart = await cartService.getOneCart(req.user.id);
        const prodList = await cartService.getProductList(cart)
        res.render('order', {
        layout: 'main',
        extraStyles: 'order.css',
        prodList
        })
    },
}
module.exports = orderController