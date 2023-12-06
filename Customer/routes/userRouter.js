const userController = require('../controllers/userController')
const router = require('express').Router()

router.get('/profile', userController.getProfilePage)

module.exports = router
