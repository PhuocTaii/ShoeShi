const User = require('../models/customer')
const bcrypt = require('bcrypt')

const userService = {
  addAdmin: async(user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = new User({
      username: user.username,
      password: hashedPassword,
      admin: true,
      name: user.name,
      birthday: user.birthday,
      phoneNum: user.phoneNum,
      email: user.email,
      gender: user.gender,
      address: user.address
    })
    newUser.admin = true
    return newUser.save()
  },
  
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

  getUserByFilterAndSort(filter, sort) {
    return User.find({admin:false}).find(filter).sort(sort)
  },

  updateAvatarUser(userId, image) {
    const user = User.findByIdAndUpdate(userId, { customerImage: image })
    return user
  },
}

module.exports = userService