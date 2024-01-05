const userService = require('../services/userService')
const User = require('../models/customer')

module.exports.isAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = await userService.getUserById(req.user.id);
    if (user.isBan) {
      res.redirect('/ban');
    } else {
      return next();
    }
  } else {
    res.redirect('/login');
  }
}
