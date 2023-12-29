const authService = require('../services/authService')
const passport = require('../config/passport.config')
const bcrypt = require('bcrypt')

const authController = {
  //Server side
  //Signup
  signup: async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.user.password, salt);

      const newUser = await authService.createNewUser(req.user, hashedPassword)

      await authService.assignCart(newUser)

      const user = await authService.signup(newUser)

      req.logIn({
        id: user._id,
        username: user.username,
        password: user.password,
        admin: user.admin,
        active: true,
      }, (loginErr) => {
      if (loginErr) {
        return res.status(500).redirect('/signup')
      }
      else
        return res.status(200).redirect('/')
    })
    } catch (err) {
      return res.status(500).redirect('/signup')
    }
  },

  checkValidUsername: async (req, res, next) => {
    try {
        const err = authService.checkValidUsername(req.body.username)
        if (err && err.errors && err.errors.username) {
          return res.status(200).json({ valid: false, message: err.errors.username.message })
        }

        const foundUser = await authService.checkExistsUsername(req.body.username)
        if (foundUser) {
          return res.status(200).json({ valid: false, message: 'Username already exists' })
        } else {
          return res.status(200).json({ valid: true, message: 'Username is valid' })
        }
      
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  checkValidPassword: (req, res, next) => {
    const err = authService.checkValidPassword(req.body.password)
    if (err && err.errors && err.errors.password) {
      return res.status(200).json({ valid: false, message: err.errors.password.message })
    }
    return res.status(200).json({ valid: true, message: 'Password is valid' })
  },

  checkValidEmail: (req, res, next) => {
    const err = authService.checkValidEmail(req.body.email)
    if (err && err.errors && err.errors.email) {
      return res.status(200).json({ valid: false, message: err.errors.email.message })
    }
    return res.status(200).json({ valid: true, message: 'Email is valid' })
  },

  //Login
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json(err)
      }
      if (!user) {
        return res.status(401).json({ message: info.message })
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: 'Login Error' })
        }
        else
          return res.status(200).json({ redirect: '/' })
      })
    })(req, res, next)
  },
  //Logout
  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      res.json({ redirect: '/' })
    })
  },

  //Client side

  getUserSignUpPage: (req, res) => {
    res.render('signup', {
      layout: 'auth',
      extraStyles: 'signup.css',
    })
  },

  getUserLogInPage: (req, res) => {
    res.render('login', {
      layout: 'auth',
      extraStyles: 'login.css',
    })
  }
}

module.exports = authController
