const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/customer')
const bcrypt = require('bcrypt')

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username })
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }

      const validated = await bcrypt.compare(password, user.password)
      if (!validated) {
        return done(null, false, { message: 'Incorrect password' })
      }

      return done(null, {
        id: user._id,
        username: user.username,
        password: user.password,
        admin: user.admin,
        id: user._id,
        active: true,
      })
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user._id, admin: user.admin })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

module.exports = passport
