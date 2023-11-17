const User = require('../models/customer')

const userService = {
  getAllUsers() {
    const query = { admin: false }
    const users = User.find(query)
    return users
  },

  addUser() {
    const newUser = new User(req.body)
    const savedUser = newUser.save()
    return savedUser
  },

  updateUser() {
    const user = User.findByIdAndUpdate(req.params.id, req.body)
    return user
  },

  deleteUser() {
    const user = User.findByIdAndDelete(req.params.id)
    return user
  },
}

module.exports = userService
