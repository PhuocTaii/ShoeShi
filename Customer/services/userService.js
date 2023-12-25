const User = require('../models/customer')
const Cart = require('../models/cart')

const userService = {

  addUser(user, imageUrl) {
    console.log(user)
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

  updateAvatarUser(userId, image){
    const user = User.findByIdAndUpdate(userId, {customerImage: image})
    return user
  },

  updateUser(id, body) {
    const user = User.findByIdAndUpdate(id, body)
    return user
  },

  getUserById(id) {
    const user = User.findById(id).lean()
    return user
  },
}

module.exports = userService
