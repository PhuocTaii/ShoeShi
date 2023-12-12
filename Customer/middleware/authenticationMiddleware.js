module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  else {
    // res.redirect('/login')
    res.status(401).json({message: 'You must login to access'})
  }
}