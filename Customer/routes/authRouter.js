const authController = require('../controllers/authController')
const router = require('express').Router()
const passport = require('../config/passport.config')

//Server side
//Signup
router.post('/signup', 
  passport.authenticate('account-activation', { action: 'requestToken' }), 
  (req, res, next) => res.status(200).json({ message: 'Email sent' })
);

router.post('/signup/check-username', authController.checkValidUsername)

router.get('/signup/verify',
  passport.authenticate('account-activation', { action : 'acceptToken' }),
  authController.signup
)

//Login
router.post('/login', authController.login)

//Logout
router.post('/logout', authController.logout)

router.get('/oauth2/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/oauth2/redirect/google', authController.loginGoogle);

//Client side
//User signup page
router.get('/signup', authController.getUserSignUpPage)

//User login page
router.get('/login', authController.getUserLogInPage)

router.get('/login/forgot-password', authController.getForgotPasswordPage)

router.post('/login/forgot-password',
  passport.authenticate('reset-password', { action: 'requestToken' }), 
  (req, res, next) => {
    res.status(200).json(req.body)
  }
);
router.get('/login/forgot-password/verify',
  passport.authenticate('reset-password', { action : 'acceptToken' }),
  authController.getResetPasswordPage
)
router.post('/login/forgot-password/verify', authController.resetPassword)

router.post('/login/find-account', authController.findUserByUsername)

//User log out page
router.get('/logout', authController.getUserLogOut)

router.get('/banned', authController.banUser)

module.exports = router