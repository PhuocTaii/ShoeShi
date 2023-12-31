const User = require('../models/customer')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')

const userService = {
  addUser(user, imageUrl) {
    const newUser = new User({
      username: user.username,
      password: user.password,
      admin: user.admin,
      name: user.name,
      birthday: user.birthday,
      phoneNum: user.phoneNum,
      gender: user.gender,
      email: user.email,
      address: user.address,
      customerImage: imageUrl,
      admin: user.admin,
    })
    const savedUser = newUser.save()
    if (newUser.admin == false) {
      var cart = new Cart({ customer: newUser._id })
      var savedCart = cart.save()
    }
    return savedUser, savedCart
  },

  updateAvatarUser(userId, image) {
    const user = User.findByIdAndUpdate(userId, { customerImage: image })
    return user
  },

  updateUser(id, body) {
    const user = User.findByIdAndUpdate(id, body)
    return user
  },

  getUserById(id) {
    const user = User.findById(id)
      .populate('username')
      .populate('password')
      .populate('name')
      .populate('birthday')
      .populate('phoneNum')
      .populate('gender')
      .populate('email')
      .populate('address')
      .populate('customerImage')
      .lean()
    return user
  },

  checkPassword: async(curPass, hashPass) => {
    const passwordMatch = bcrypt.compare(curPass, hashPass)
    return passwordMatch
  },

  resetPassword: async(id, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    return User.findByIdAndUpdate(id, {password: hashedPassword})
  },

}

module.exports = userService
