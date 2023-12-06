const userService = require('../services/userService')
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

  getAccountsPage: async (req, res) => {
    res.render('admin/accounts', {
      layout: 'admin/layout/main',
      extraStyles: 'accounts.css',
    })
  },

  getAdminProfilePage: async (req, res) => {
    res.render('admin/profile', {
      layout: 'admin/layout/main',
      extraStyles: 'profile.css',
    })
  },
}
module.exports = userController
