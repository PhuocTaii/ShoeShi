const userService = require('../services/userService')

module.exports.isAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = await userService.getUserById(req.user.id);
    if (user.isBan) {
      res.redirect('/banned');
    } else {
      return next();
    }
  } else {
    // res.status(401).json({message: 'You must login to access'})a
    res.redirect('/login');
  }
}
