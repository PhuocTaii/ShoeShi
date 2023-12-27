const userController = require('../controllers/userController')
const { isAuth } = require('../middleware/authenticationMiddleware');
const router = require('express').Router()

router.get('/', isAuth ,userController.getProfilePage)

module.exports = router
