const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/customer')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')
const MagicLinkStrategy = require('passport-magic-link').Strategy;
const sendgrid = require('@sendgrid/mail');
const dotenv = require('dotenv')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

passport.use('account-activation', new MagicLinkStrategy({
  secret: process.env.secret_key,
  userFields: [ 'email' ],
  tokenField: 'token',
  passReqToCallbacks: true,
}, (req, user, token) => {
  // var link = 'http://' + process.env.HOST + ':' + process.env.PORT + '/signup/verify?token=' + token;
  var link = 'https://' + process.env.HOST+ '/signup/verify?token=' + token;
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

passport.use('reset-password', new MagicLinkStrategy({
  secret: process.env.secret_key,
  userFields: [ 'email' ],
  tokenField: 'token',
  passReqToCallbacks: true,
}, (req, user, token) => {
  // const link = 'http://' + process.env.HOST + ':' + process.env.PORT + '/login/forgot-password/verify?token=' + token;
  const link = 'https://' + process.env.HOST + '/login/forgot-password/verify?token=' + token;
  const msg = {
    to: user.email,
    from: process.env['EMAIL'],
    subject: 'Reset password',
    text: 'Click the link below to confirm reset password:\r\n\n' + link,
    html: 
      `
      <p style="font-size: 14px; color: black;">Click the link below to confirm reset password:</p>
      <p style="font-size: 16px; color: #ff7100; text-decoration: underline, "><a href="${link}">Go to reset password</a></p>
      `
  };
  sendgrid.send(msg);
}, (req, user) => {
    return req.body;
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: 'http://' + process.env.HOST + ':' + process.env.PORT + '/oauth2/redirect/google'
  callbackURL: 'https://' + process.env.HOST + '/oauth2/redirect/google'
},
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const user = await User.findOne({ googleId: profile.id })
      // The account at Google has not logged in to this app before.
      // Create a new user record and associate it with the Google account.
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          username: profile.id,
          name: profile.displayName,
          customerImage: profile.photos ? profile.photos[0].value : '',
          active: true,
        })
        await new Cart({ customer: newUser._id }).save();
        return cb(null, newUser)
      }
      // The account at Google has previously logged in to the app.
      // Get the user record associated with the Google account and log the user in.
      else {
        return cb(null, user)
      }
    } catch (err) {
      return cb(err)
    }
  }
));

module.exports = passport
