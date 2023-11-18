const userService = require('../services/userService')
const User = require('../models/customer')

const userController = {
  //GET all customers
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers()
      if (!users) {
        return res.status(500).json(err)
      }
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD customers
  addUser: async (req, res) => {
    try {
      const savedUser = await userService.addUser(req.body)
      res.status(200).json(savedUser)
    } catch (err) {
      console.log(err)
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
      if (!user) {
        res.status(500).json(err)
      }
      res.status(200).json('The user has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
module.exports = userController
