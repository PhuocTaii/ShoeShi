const profileService = require('../services/profileService')
const imageService = require('../services/imageService')
const userService = require('../services/userService')
const User = require('../models/customer')

const adminController = {
  getAdminProfilePage: async (req, res) => {
    const user = await User.findById(req.user.id).lean()
    console.log(user.name)
    res.render('profile', {
      layout: 'main',
      extraStyles: 'profile.css',
      user
    })
  },

  updateUser: async (req, res) => {
    try {
      const user = await profileService.updateUser(req.params.id, req.body)
      if (!user) {
        return res.status(500).json(err)
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
      console.error(err)
    }
  },

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

  checkPassword: async (req, res) => {
    try{
      const user = await User.findById(req.params.id)
      const passwordMatch = await profileService.checkPassword(req.body.curPass, user.password)
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
      const user = await profileService.resetPassword(req.params.id, req.body.newPassword)
      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  },
  
}

module.exports = adminController
