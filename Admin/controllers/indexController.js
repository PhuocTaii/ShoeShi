const productService = require('../services/productService');

const indexController = {
    getAdminHomePage: (req, res) => {
        res.render('admin/index', {
            extraStyles: 'dashboard.css',
            layout: 'admin/layout/main',
        })
    }
}

module.exports = indexController;