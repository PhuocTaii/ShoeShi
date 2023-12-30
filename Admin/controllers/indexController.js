const orderService = require('../services/orderService');
const productService = require('../services/productService');

const indexController = {

    getAdminHomePage: async(req, res) => {
        const orders = await orderService.getAllOrders();
        const revenue = await orderService.getRevenue();
        console.log(revenue);
        res.render('index', {
            orders,
            revenue,
            extraStyles: 'dashboard.css',
            layout: 'main',
        })
    }
}

module.exports = indexController;