const orderService = require('../services/orderService');
const productService = require('../services/productService');

const indexController = {

    getAdminHomePage: async(req, res) => {
        const orders = await orderService.getAllDoneOrders();
        const revenue = await orderService.getRevenue();
        res.render('index', {
            orders,
            revenue,
            extraStyles: 'dashboard.css',
            layout: 'main',
            user: req.user
        })
    },

    getChartData: async(req, res) => {
        try{
            const orders = await orderService.getAllDoneOrders();
            const revenue = await orderService.getChartDataByMonth(orders, req.body.month);
            res.status(200).json(revenue);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getTableData: async(req, res) => {
        try{
            const orders = await orderService.getAllDoneOrders();
            const products = await productService.getAllProducts();
            var productsName = [];
            for(let i = 0; i < products.length; i++) {
                productsName.push({product: products[i].name, count:0, revenue:0})
            }

            const data = await orderService.getTableDataByMonth(orders, req.body.month, productsName);

            res.status(200).json(data);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = indexController;