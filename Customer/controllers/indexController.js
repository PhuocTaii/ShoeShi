const productService = require('../services/productService');
const userService = require('../services/userService')
const {isAuth, isAdmin} = require('../middleware/authenticationMiddleware')

const indexController = {
    getCustomerHomePage: async(req, res) => {
        try{
            const featuredProducts = await productService
            .getFeaturedProducts()
            res.render('index', {
                extraStyles: 'home.css',
                layout: 'main',
                featuredProducts,
                user: req.user || null,
            })
        } catch(err){
            console.log(err)    
            res.status(500).json(err)
        }
    },
}

module.exports = indexController;