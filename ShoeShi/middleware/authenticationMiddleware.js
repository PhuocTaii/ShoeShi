module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  else {
    res.redirect('/login')
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin == true) return next()
  else {
    res.redirect('/admin/login')
  }
}
