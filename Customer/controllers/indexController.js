const productService = require('../services/productService');
const cartService = require('../services/cartService');
const userService = require('../services/userService')
const {isAuth, isAdmin} = require('../middleware/authenticationMiddleware')

const indexController = {
    getCustomerHomePage: async(req, res) => {
        try{
            const featuredProducts = await productService
            .getFeaturedProducts()

            if(req.user){
            const cart = await cartService.getOneCart(req.user.id)
            const prodList = await cartService.getProductList(cart)
            res.render('index', {
                extraStyles: 'home.css',
                layout: 'main',
                featuredProducts,
                prodList,
                user: req.user || null,
            })
            }
            else{
                // const localCart = await cartService.getLocalCart()
                res.render('index', {
                    extraStyles: 'home.css',
                    layout: 'main',
                    featuredProducts,
                    cart: null,
                    user: null,
                })
            }
        } catch(err){
            console.log(err)    
            res.status(500).json(err)
        }
    },
}

module.exports = indexController;