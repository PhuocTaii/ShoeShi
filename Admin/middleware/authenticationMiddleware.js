// module.exports.isAuth = (req, res, next) => {
//   if (req.isAuthenticated()) return next()
//   else {
//     // res.redirect('/login')
//     res.status(401).json({message: 'You must login to access'})
//   }
// }

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin == true) return next()
  else {
    res.redirect('/login')
  }
}
