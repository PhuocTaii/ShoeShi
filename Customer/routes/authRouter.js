const authController = require('../controllers/authController')
const router = require('express').Router()

//Server side
//Signup
router.post('/signup', authController.signup)

//Login
router.post('/login', authController.login)

//Logout
router.post('/logout', authController.logout)

//Client side
//User signup page
router.get('/signup', authController.getUserSignUpPage)  

//User login page
router.get('/login', authController.getUserLogInPage)

module.exports = router