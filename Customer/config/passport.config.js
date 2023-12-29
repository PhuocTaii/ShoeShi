const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/customer')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')
const MagicLinkStrategy = require('passport-magic-link').Strategy;
const sendgrid = require('@sendgrid/mail');
const dotenv = require('dotenv')

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
        active: true,
      })
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, admin: user.admin })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

dotenv.config()
sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);

passport.use(new MagicLinkStrategy({
  secret: process.env.secret_key,
  userFields: [ 'username', 'password', 'email' ],
  tokenField: 'token',
  passReqToCallbacks: true,
}, (req, user, token) => {
  var link = 'http://' + process.env.HOST + ':' + process.env.PORT + '/signup/verify?token=' + token;
  var msg = {
    to: user.email,
    from: process.env['EMAIL'],
    subject: 'Sign up to ShoeShi',
    text: 'Click the link below to finish signing up to ShoeShi.\r\n\r\n' + link,
    html: 
      `<div style="padding:20px;border:1px solid black;flex-direction: column;border-radius: 10px;">
        <h1 style="color: black;">Welcome to ShoeShi!</h1>
        <p style="font-size: 16px; color: black;">Click the link below to finish signing up to ShoeShi.</p>
        <p><a style="font-size: 16px; color: #15c;" href="${link}">Confirm email</a></p>
      </div>
      `
  };
  return sendgrid.send(msg);
}, (req, user) => {
    return req.body;
}));

module.exports = passport
