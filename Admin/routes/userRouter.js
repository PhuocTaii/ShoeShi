const userController = require('../controllers/userController')
const router = require('express').Router()
const { isAuth, isAdmin } = require('../middleware/authenticationMiddleware')

//GET all users
router.get('/user', userController.getAllUsers)

//DELETE user
router.delete('/user/:id', userController.deleteUser)

//Client side
router.get('/', userController.getAccountsPage)
router.get('/api', userController.handlePaging)

router.get('/profile', isAdmin, userController.getAdminProfilePage)

module.exports = router
