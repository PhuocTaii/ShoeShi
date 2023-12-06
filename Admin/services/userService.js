const User = require('../models/customer')
const Cart = require('../models/cart')

const userService = {
  getAllUsers() {
    const users = User.find({ admin: false })
    console.log(users)
    return users
  },

  deleteUser(id) {
    const user = User.findByIdAndDelete(id)
    return user
  },

  getUserById(id) {
    const user = User.findById(id)
    return user
  },
}

module.exports = userService