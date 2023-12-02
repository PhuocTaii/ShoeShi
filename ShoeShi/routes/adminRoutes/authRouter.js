const authController = require('../../controllers/authController')
const router = require('express').Router()

// Server side
//Signup
router.post('/signup', authController.signup)

//Login
router.post('/login', authController.login)

//Logout
router.post('/logout', authController.logout)

//Client side
//Admin login page
router.get('/login', authController.getAdminLoginPage)

module.exports = router