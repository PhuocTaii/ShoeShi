const userService = require('../services/userService')
const productService = require('../services/productService')
const orderService = require('../services/orderService')

const orderController = {
    getOrderPage: async (req, res) => {
        const orders = await orderService.getAllOrderById(req.user.id)
        
        const formattedOrders = orders.map(order => ({
            status: order.status,
                _id: order._id,
                date: order.orderTime,
                items: (order.productList && Array.isArray(order.productList)) ? order.productList.map(item => ({
                    itemName: item.product,
                    itemPrice: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    itemQuantity: item.quantity,
                    itemSize: item.size,
                    // Other item details you want to display
                })) : [], // If items is undefined or not an array, default to an empty array
                totalPrice: order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                // Add other necessary fields here
        }));

        res.render('order', {
        layout: 'main',
        extraStyles: 'order.css',
        formattedOrders,
        })
    },
}
module.exports = orderController