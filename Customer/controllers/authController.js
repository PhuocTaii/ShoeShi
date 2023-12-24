const authService = require('../services/authService')
const passport = require('../config/passport.config')

const authController = {
  //Server side
  //Signup
  signup: async (req, res, next) => {
    try {
      const user = await authService.signup(req.body)
      return res.status(200).json({ redirect: '/login' })
    } catch (err) {
      res.status(500).json('Signup failed: ' + err.message)
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
  },

  getUserLogOut: (req, res) => {
    req.logout((err) => {
    if (err) {
      // Handle logout error
      return res.status(500).json({ message: 'Logout Error' });
    }
    res.redirect('/');
  });
  }

}



module.exports = authController
