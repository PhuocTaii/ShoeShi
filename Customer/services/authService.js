const User = require('../models/customer')
const Cart = require('../models/cart')

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
}

module.exports = authService