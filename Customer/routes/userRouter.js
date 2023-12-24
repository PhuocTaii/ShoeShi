const userController = require('../controllers/userController')
const router = require('express').Router()
const { isAuth, isAdmin } = require('../middleware/authenticationMiddleware')


router.get('/', isAuth, userController.getProfilePage)

module.exports = router
