const userService = require('../services/userService')
const cartService = require('../services/cartService')
const imageService = require('../services/imageService')
const User = require('../models/customer')

const handlebars = require('handlebars')

handlebars.registerHelper('eq', function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this)
})

const userController = {
  // ADD customers
  addUser: async (req, res) => {
    try {
      let imageUrl = ''
      if (req.body.customerImage) {
        imageUrl = await imageService.uploadImageToCloudinary(
          req.body.customerImage
        )
      }
      console.log(imageUrl)
      const savedUser = await userService.addUser(req.body, imageUrl)
      res.status(200).json(savedUser)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  //UPDATE avatar
  updateAvatar: async (req, res) => {
    try {
      const file = req.file
      const imageUrl = await imageService.uploadImageToCloudinary(file.buffer)
      const user = await userService.updateAvatarUser(req.params.id, imageUrl)
      res.json(user);
    } catch (err) {
      // res.status(500).json(err)
      console.log(err)
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
      console.error(err)
    }
  },

  getProfilePage: async (req, res) => {
    const user = await userService.getUserById(req.user.id)
    const cart = await cartService.getOneCart(req.user.id);
    const prodList = await cartService.getProductList(cart)
    res.render('profile', {
      layout: 'main',
      extraStyles: 'profile.css',
      user,
      prodList,
    })
  },

  checkPassword: async (req, res) => {
    try{
      const user = await User.findById(req.params.id)
      const passwordMatch = await userService.checkPassword(req.body.curPass, user.password)
      if(passwordMatch == true){
        return res.status(200).json({ valid: true, message: 'Correct password' })
      } else{
        return res.status(200).json({ valid: false, message: 'Wrong password' })
      }
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },

  resetPassword: async (req, res) => {
    try {
      console.log(req.body)
      const user = await userService.resetPassword(req.params.id, req.body.newPassword)
      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  },

  // updatePassword: async (req, res) => {
  //   const { id, oldPassword, newPassword } = req.body
  //   try {
  //     // Fetch user from database by username (pseudo code)
  //     const user = await User.findById(id)
  //     console.log(req.body)
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' })
  //     }
  //     console.log(user)
  //     // Compare submitted old password with the stored hashed password
  //     const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password)

  //     if (!oldPasswordMatch) {
  //       return res.status(401).json({ message: 'Incorrect current password' })
  //     }

  //     // Hash the new password
  //     const hashedNewPassword = await bcrypt.hash(newPassword, 10)

  //     // Update user's password in the database
  //     user.password = hashedNewPassword
  //     await user.save()

  //     return res.status(200).json({ message: 'Password updated successfully' })
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message })
  //   }
  // },
}

module.exports = userController
