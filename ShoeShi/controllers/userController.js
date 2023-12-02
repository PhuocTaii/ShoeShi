const userService = require('../services/userService')
const cartService = require('../services/cartService')
const imageService = require('../services/imageService')
const User = require('../models/customer')

const userController = {
  //GET all customers
  getAllUsers: async (req, res) => {
    try {
      console.log(123)
      const users = await userService.getAllUsers()
      console.log(users)

      if (!users) {
        return res.status(500).json(err)
      }
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD customers
  // addUser: async (req, res) => {
  //   try {
  //     let imageUrl = ''
  //     if(req.body.customerImage){
  //       imageUrl = await imageService.uploadImageToCloudinary(req.body.customerImage)
  //     }
  //     console.log(imageUrl) 
  //     const savedUser = await userService.addUser(req.body, imageUrl)
  //     res.status(200).json(savedUser)
  //   } catch (err) {
  //     console.log(err)
  //     res.status(500).json(err)
  //   }
  // },

  //UPDATE avatar
  updateAvatar: async (req, res) => {
    try{
      let imageUrl = ''
      imageUrl = await imageService.uploadImageToCloudinary(req.body.customerImage)
      const user = await userService.updateAvatarUser(req.params.id, imageUrl)
      res.status(200).json(user)
    } catch(err){
      res.status(500).json(err)
    }
  },

  //UPDATE customers
  updateUser: async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body)
      if (!user) {
        return res.status(500).json(err)
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE customers
  deleteUser: async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id)
      const cart = await cartService.deleteCart(req.params.id)
      res.status(200).json('The user has been deleted')
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  getProfilePage: async (req, res) => {
    res.render('customer/profile', {
      layout: 'customer/layout/main',
      extraStyles: 'profile.css',
    })
  },

  getAccountsPage: async (req, res) => {
    res.render('admin/accounts', {
      layout: 'admin/layout/main',
      extraStyles: 'accounts.css',
    })
  }
}
module.exports = userController
