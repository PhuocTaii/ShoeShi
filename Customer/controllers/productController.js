const productService = require('../services/productService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const categoryService = require('../services/categoryService')
const manufacturerService = require('../services/manufacturerService')
const cartService = require('../services/cartService')
const imageService = require('../services/imageService')

const productController = {
  //GET all products
  getAllProducts: async (req, res) => {
    try {
      const { 'product-name': productName, category, manufacturer, 'from-input': priceMin, 'to-input': priceMax, page, sort } = req.query;
      const pageTo = parseInt(page) || 1

      const products = await productService.getProductsWithCondition(pageTo, productName, category, manufacturer, priceMin, priceMax, sort)
      const totalProducts = await productService.getTotalProductsWithCondition(pageTo, productName, category, manufacturer, priceMin, priceMax, sort)
      const amountProduct = totalProducts[0] ? totalProducts[0].totalCount : 0
      const totalPages = Math.ceil(amountProduct / productService.productsPerPage)
      res.json({
        products,
        totalPages,
        activePage: pageTo
      });
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },

  getProductPage: async (req, res) => {
    try{
      const categories = await categoryService.getAllCategories()
      const manufacturers = await manufacturerService.getAllManufacturers()
      if(req.user){
        const cart = await cartService.getOneCart(req.user.id);
        const prodList = await cartService.getProductList(cart)
        const { 'product-name': productName, category, manufacturer, 'from-input': priceMin, 'to-input': priceMax, page, sort } = req.query;
        const pageTo = parseInt(page) || 1

        const products = await productService.getProductsWithCondition(pageTo, productName, category, manufacturer, priceMin, priceMax, sort)
        const totalProducts = await productService.getTotalProductsWithCondition(pageTo, productName, category, manufacturer, priceMin, priceMax, sort)
        const amountProduct = totalProducts[0] ? totalProducts[0].totalCount : 0
        const totalPages = Math.ceil(amountProduct / productService.productsPerPage)
        res.render('productList', {
          categories,
          manufacturers,
          layout: 'main',
          extraStyles: 'productList.css',
          user: req.user,
          prodList,
          products,
          totalPages,
          activePage: pageTo
        });
      } else{
        const { 'product-name': productName, category, manufacturer, 'from-input': priceMin, 'to-input': priceMax, page, sort } = req.query;
        const pageTo = parseInt(page) || 1

        const products = await productService.getProductsWithCondition(pageTo, productName, category, manufacturer, priceMin, priceMax, sort)
        const totalProducts = await productService.getTotalProductsWithCondition(pageTo, productName, category, manufacturer, priceMin, priceMax, sort)
        const amountProduct = totalProducts[0] ? totalProducts[0].totalCount : 0
        const totalPages = Math.ceil(amountProduct / productService.productsPerPage)

        res.render('productList', {
          categories,
          manufacturers,
          layout: 'main',
          extraStyles: 'productList.css',
          user: req.user,
          products,
          totalPages,
          activePage: pageTo
        });

      }
    } catch(err){
      res.status(500).json(err)
    }
  },

  //Get related products
  getRelatedProducts: async(req, res) => {
    try{
      const page = parseInt(req.query.page) || 1
      const product = await productService.getProductById(req.params.id)
      const relatedProducts = await productService.getRelatedProducts(product, req.params.id)
      res.status(200).json({
        products: relatedProducts,
        amount: relatedProducts.length,
      })
    } catch(err){
      res.status(500).json(err)
    }
  },

  getProductDetail: async (req, res) => {
    try {
      const details = await productService.getProductDetail(req.params.id)
      if(req.user){
        const cart = await cartService.getOneCart(req.user.id);
        const prodList = await cartService.getProductList(cart)
        res.render('productDetail', {
          details,
          layout: 'main',
          extraStyles: 'productDetail.css',
          user: req.user,
          prodList
        })
      } else{
        res.render('productDetail', {
          details,
          layout: 'main',
          extraStyles: 'productDetail.css',
          user: null,
        })
      }
      
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
module.exports = productController
