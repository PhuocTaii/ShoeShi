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

  addAdmin: async (req, res) => {
    try{
      // console.log(req.body)
      const user = await userService.addAdmin(req.body)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
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
      const {
        page = 1,
        limit = 10,
        sortBy,
        sortOrder,
        filterBy,
        search,
        isAdmin,
      } = req.query

      const filter = {}
      if (filterBy && search) {
        filter[filterBy] = { $regex: search, $options: 'i' }
      }

      if (isAdmin !== undefined) {
        filter.admin = isAdmin === 'true'
      }

      const sort = {}
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1
      }

      const users = await userService.getUserByFilterAndSort(filter, sort)
      const totalUsers = users.length
      const totalPage = Math.ceil(totalUsers / 5)
      const pages = Array.from({ length: totalPage }, (_, i) => i + 1)

      let currentPage
      if(isAdmin === 'true') {
        currentPage = Number(req.query.pageAdmin) || 1
      }
      else {
        currentPage = Number(req.query.pageUser) || 1
      }
      
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
  },
  getAccountsPage: async (req, res) => {
    const itemPerPage = 5
    const currentPage = Number(req.query.pageUser) || 1
    const currentPageAdmin = Number(req.query.pageAdmin) || 1

    const totalCustomer = await User.countDocuments({ admin: false })
    const totalAdmin = await User.countDocuments({ admin: true })
    const totalPage = Math.ceil(totalCustomer / itemPerPage)
    const totalPageAdmin = Math.ceil(totalAdmin / itemPerPage)
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
    const pagesAdmin = Array.from({ length: totalPageAdmin }, (_, i) => i + 1)

    console.log(req.user.id)

    res.render('accounts', {
      layout: 'main',
      extraStyles: 'accounts.css',
      pages: pages,
      pagesAdmin: pagesAdmin,
      totalPage,
      totalPageAdmin,
      userId: req.user.id,
    })
  },

  getAdminProfilePage: async (req, res) => {
    res.render('profile', {
      layout: 'main',
      extraStyles: 'profile.css',
    })
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id)
      const formattedUser = {
        id: user._id, // Assuming _id is the ID of the user
        name: user.name,
        gender: user.gender,
        address: user.address,
        email: user.email,
        phone: user.phoneNum,
        dob: user.birthday,
        username: user.username,  
        avatar: user.avatar,
      }
      return res.status(200).json(formattedUser) // Return the fetched user
    } catch (err) {
      res.status(500).json(err)
    }
  },

  banAccount: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id)
      user.isBan = !user.isBan
      await user.save()
      res.status(200).json('The user has been banned')
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
module.exports = userController
