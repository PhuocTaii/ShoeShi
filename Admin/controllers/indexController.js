const orderService = require('../services/orderService');
const productService = require('../services/productService');

const indexController = {

    getAdminHomePage: async(req, res) => {
        const orders = await orderService.getAllDoneOrders();
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
            console.log(req.body.month);
            const revenue = await orderService.getChartDataByMonth(orders, req.body.month);
            res.json(revenue);
        } catch(err) {
            console.log(err);
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

            res.json(data);
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = indexController;