const userController = require('../../controllers/userController')
const router = require('express').Router()

//GET all users
router.get('/user', userController.getAllUsers)

//ADD user
router.post('/user', userController.addUser)

//UPDATE user
router.put('/user/:id', userController.updateUser)

//DELETE user
router.delete('/user/:id', userController.deleteUser)

//Client side
router.get('/accounts', userController.getAccountsPage)

router.get('/profile', userController.getAdminProfilePage)

module.exports = router
