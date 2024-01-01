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

  handlePaging: async (req, res) => {
    try {
      const users = await userService.getAllUsers()
      const totalUsers = users.length
      const totalPage = Math.ceil(totalUsers / 5)
      const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
      let currentPage = Number(req.query.pageUser) || 1
      if (currentPage > totalPage) {
        currentPage = totalPage
      }
      if (currentPage < 1) {
        currentPage = 1
      }
      const usersPerPage = 5
      const startIndex = (currentPage - 1) * usersPerPage
      const endIndex = currentPage * usersPerPage
      const usersInPage = users.slice(startIndex, endIndex)
      res.status(200).json({ usersInPage, pages, currentPage })
    } catch (err) {
      res.status(500).json(err)
    }
  }
  ,
  getAccountsPage: async (req, res) => {
    const currentPage = Number(req.query.pageUser) || 1
    const itemPerPage = 5

    const users = await User.find()
      .select('username name email createTime')
      .skip((currentPage - 1) * itemPerPage)
      .limit(itemPerPage)

    const totalUsers = await User.countDocuments()
    const totalPage = Math.ceil(totalUsers / itemPerPage)
    const pages = Array.from({length: totalPage}, (_, i) => i + 1);

    const formattedUsers = users.map((user) => ({
      username: user.username,
      name: user.name,
      email: user.email,
      createTime: user.createTime,
    }))

    res.render('accounts', {
      layout: 'main',
      extraStyles: 'accounts.css',
      customers: formattedUsers,
      currentPage: currentPage,
      pages: pages,
      totalPage,
    })
  },

  getAdminProfilePage: async (req, res) => {
    res.render('profile', {
      layout: 'main',
      extraStyles: 'profile.css',
    })
  },
  
}
module.exports = userController
