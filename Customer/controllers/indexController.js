const productService = require('../services/productService');


const indexController = {
    getCustomerHomePage: async(req, res) => {
        try{
            const featuredProducts = await productService
            .getFeaturedProducts()
            res.render('index', {
                extraStyles: 'home.css',
                layout: 'layout/main',
                featuredProducts,
            })
        } catch(err){
            console.log(err)    
            res.status(500).json(err)
        }
    },
}

module.exports = indexController;