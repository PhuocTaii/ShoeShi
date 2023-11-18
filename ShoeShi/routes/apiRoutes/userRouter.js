const userController = require('../../controllers/userController')
const router = require('express').Router()

//GET all users
router.get('/admin/user', userController.getAllUsers)

//ADD one user
router.post('/admin/user', userController.addUser)

//UPDATE user
router.put('/admin/user/:id', userController.updateUser)

//DELETE user
router.delete('/admin/user/:id', userController.deleteUser)

module.exports = router
