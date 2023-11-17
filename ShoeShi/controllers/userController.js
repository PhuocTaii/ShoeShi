const userService = require('../services/userService')

const userController = {
  //GET all users
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

  //ADD user
  addUser: async (req, res) => {
    try {
      const savedUser = await userService.addUser()
      res.status(200).json(savedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //UPDATE user
  updateUser: async (req, res) => {
    try {
      const user = await userService.updateUser()
      if (!user) {
        return res.status(500).json(err)
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE user
  deleteUser: async (req, res) => {
    try {
      const user = await userService.deleteUser()
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
