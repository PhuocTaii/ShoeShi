const userController = require('../controllers/userController')
const router = require('express').Router()

//GET all users
router.get('/user', userController.getAllUsers)

//DELETE user
router.delete('/user/:id', userController.deleteUser)

//Client side
router.get('/', userController.getAccountsPage)

router.get('/profile', userController.getAdminProfilePage)

module.exports = router
