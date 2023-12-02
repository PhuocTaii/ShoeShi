const User = require('../models/customer')
const Cart = require('../models/cart')

const userService = {
  getAllUsers() {
    const users = User.find({ admin: false })
    console.log(users)
    return users
  },

  addUser(user) {
    const newUser = new User(user)
    const savedUser = newUser.save()
    if (newUser.admin == false) {
      var cart = new Cart({ customer: newUser._id })
      var savedCart = cart.save()
    }
    return savedUser, savedCart
  },

  updateUser(id, body) {
    const user = User.findByIdAndUpdate(id, body)
    return user
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
