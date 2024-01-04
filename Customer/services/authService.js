const User = require('../models/customer')
const Cart = require('../models/cart')
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);

const authService = {
  assignCart(user) {
    const newCart = new Cart({ customer: user._id });
    return newCart.save();
  },

  createNewUser(user, hashedPassword) {
    const newUser = new User(user);
    newUser.password = hashedPassword;
    return newUser;
  },

  signup(newUser) {
    return newUser.save();
  },

  checkValidUsername(username) {
    const user = new User({ username: username })
    return user.validateSync();
  },

  checkExistsUsername(username) {
    return User.exists({ username: username });
  },

  checkValidPassword(password) {
    const user = new User({ password: password })
    return user.validateSync();
  },

  checkValidEmail(email) {
    const user = new User({ email: email })
    return user.validateSync();
  },

  generateRandomPassword() {
    return Math.random().toString(36).slice(2) +
          Math.random().toString(36).toUpperCase().slice(2);
  },

  sendNewPassword(user, newPassword) {
    const msg = {
      to: user.email,
      from: process.env['EMAIL'],
      subject: 'Reset password',
      text: 'Your new password: ' + newPassword,
      html: 
        `<p style="font-size: 16px; color: black;">Your new password: ${newPassword}</p>
        `
    };
    return sendgrid.send(msg);
  },

  resetPassword(id, newPassword) {
    return User.findByIdAndUpdate(id, {password: newPassword})
  },

  getUserByUsername(username) {
    return User.findOne({ username: username })
  },
}

module.exports = authService