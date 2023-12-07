const productService = require('../services/productService');

const indexController = {
    getAdminHomePage: (req, res) => {
        res.render('index', {
            extraStyles: 'dashboard.css',
            layout: 'layout/main',
        })
    }
}

module.exports = indexController;