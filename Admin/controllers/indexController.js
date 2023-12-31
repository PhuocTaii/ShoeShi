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
    },

    getChartData: async(req, res) => {
        try{
            const orders = await orderService.getAllDoneOrders();
            console.log(orders);
            console.log(req.body.month);
            const revenue = await orderService.getDataByMonth(orders, req.body.month);
            // const products = await productService.getAllProducts();
            // const data = {
            //     orders,
            //     revenue,
            //     products,
            // }
            // res.json(req.body);
            res.json(revenue);
        } catch(err) {
            console.log(err);
        }
    } 
}

module.exports = indexController;