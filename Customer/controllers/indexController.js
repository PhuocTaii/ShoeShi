const productService = require('../services/productService');


const indexController = {
    getCustomerHomePage: async(req, res) => {
        try{
            const featuredProducts = await productService
            .getFeaturedProducts()
            res.render('customer/index', {
                extraStyles: 'home.css',
                layout: 'customer/layout/main',
                featuredProducts,
            })
        } catch(err){
            console.log(err)    
            res.status(500).json(err)
        }
    },

    getAdminHomePage: (req, res) => {
        res.render('admin/index', {
            extraStyles: 'dashboard.css',
            layout: 'admin/layout/main',
        })
    }
}

module.exports = indexController;