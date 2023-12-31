const authService = require('../services/authService')
const passport = require('../config/passport.config')
const userService = require('../services/userService')
const bcrypt = require('bcrypt')

const authController = {
  //Server side
  //Signup
  signup: async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.user.password, salt)

      const newUser = await authService.createNewUser(req.user, hashedPassword)

      await authService.assignCart(newUser)

      const user = await authService.signup(newUser)

      req.logIn(
        {
          id: user._id,
          username: user.username,
          password: user.password,
          admin: user.admin,
          active: true,
        },
        (loginErr) => {
          if (loginErr) {
            return res.status(500).redirect('/signup')
          } else return res.status(200).redirect('/')
        }
      )
    } catch (err) {
      return res.status(500).redirect('/signup')
    }
  },

  checkValidUsername: async (req, res, next) => {
    try {
      const foundUser = await authService.checkExistsUsername(req.body.username)
      if (foundUser) {
        return res
          .status(200)
          .json({ valid: false, message: 'Username already exists' })
      } else {
        return res
          .status(200)
          .json({ valid: true, message: 'Username is valid' })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
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
      req.logIn(user, async (loginErr) => {
        // Add async here
        if (loginErr) {
          return res.status(500).json({ message: 'Login Error' })
        } else {
          const user = await userService.getUserById(req.user.id) // Now you can use await here
          if (user?.isBan) {
            return res.status(200).json({ redirect: '/banned' })
          }
          return res.status(200).json({ redirect: '/' })
        }
      })
    })(req, res, next)
  },

  loginGoogle: (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) {
        return res.status(500).json(err)
      }
      req.logIn(user, async (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: 'Login Error' })
        } else {
          const user = await userService.getUserById(req.user.id)
          if (user?.isBan) {
            return res.status(200).redirect('/banned')
          }
          return res.status(200).redirect('/')
        }
      })
    })(req, res, next)
  },

  resetPassword: async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
      await authService.resetPassword(req.body.id, hashedPassword)
      return res.status(200).json({ hashedPassword })
    } catch (err) {
      return res.status(500).json(err)
    }
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
  },

  getForgotPasswordPage: (req, res) => {
    res.render('forgotPassword', {
      layout: 'auth',
      extraStyles: 'login.css',
    })
  },

  findUserByUsername: async (req, res) => {
    try {
      const foundUser = await authService.getUserByUsername(req.body.username)
      if (!foundUser) {
        return res.status(200).json(null)
      }

      return res.status(200).json(foundUser)
      // return res.status(200).json({id: foundUser._id})
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  getResetPasswordPage: (req, res) => {
    res.render('resetPassword', {
      layout: 'auth',
      extraStyles: 'login.css',
      user: req.user,
    })
  },

  getUserLogOut: (req, res) => {
    req.logout((err) => {
      if (err) {
        // Handle logout error
        return res.status(500).json({ message: 'Logout Error' })
      }
      res.redirect('/')
    })
  },

  banUser: (req, res) => {
    res.render('banned', {
      layout: 'auth',
      extraStyles: 'banned.css',
    })
  },
}

module.exports = authController
