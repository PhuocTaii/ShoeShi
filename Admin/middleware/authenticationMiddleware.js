const userService = require('../services/userService')

module.exports.isAdmin = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin == true){
    const user = await userService.getUserById(req.user.id).lean();
    if (user.isBan) {
      res.redirect('/banned');
    } else {
      return next();
    }
  }
  else {
    res.redirect('/login')
  }
}
