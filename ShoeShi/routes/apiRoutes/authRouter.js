const authController = require('../../controllers/authController')
const router = require('express').Router()

//USER
//Signup
router.post('/signup', authController.signup)

//Login
router.post('/login', authController.login)

//Logout
router.post('/logout', authController.logout)

//ADMIN
router.post('/admin/signup', authController.signup)
//Login
router.post('/admin/login', authController.login)

//Logout
router.post('/admin/logout', authController.logout)

module.exports = router