const authController = require('../controllers/authController')
const router = require('express').Router()
const passport = require('../config/passport.config')

//Server side
//Signup
router.post('/signup', 
  passport.authenticate('magiclink', { action: 'requestToken' }), 
  (req, res, next) => {
    res.status(200).json({ message: 'Email sent' })
  }
);

router.post('/signup/check-username', authController.checkValidUsername)
router.post('/signup/check-password', authController.checkValidPassword)
router.post('/signup/check-email', authController.checkValidEmail)

router.get('/signup/verify',
  passport.authenticate('magiclink', { action : 'acceptToken' }),
  authController.signup
)

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