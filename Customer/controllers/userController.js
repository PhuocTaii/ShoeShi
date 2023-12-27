const userService = require('../services/userService')
const cartService = require('../services/cartService')
const imageService = require('../services/imageService')
const User = require('../models/customer')

const userController = {

  // ADD customers
  addUser: async (req, res) => {
    try {
      let imageUrl = ''
      if(req.body.customerImage){
        imageUrl = await imageService.uploadImageToCloudinary(req.body.customerImage)
      }
      const savedUser = await userService.addUser(req.body, imageUrl)
      res.status(200).json(savedUser)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  //UPDATE avatar
  updateAvatar: async (req, res) => {
    try{
      let imageUrl = ''
      imageUrl = await imageService.uploadImageToCloudinary(req.body.customerImage)
      const user = await userService.updateAvatarUser(req.params.id, imageUrl)
      res.status(200).json(user)
    } catch(err){
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

  getProfilePage: async (req, res) => {
    res.render('profile', {
      layout: 'main',
      extraStyles: 'profile.css',
    })
  },

}
module.exports = userController
