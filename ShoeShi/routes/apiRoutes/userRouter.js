const userController = require('../../controllers/userController')
const router = require('express').Router()

//GET all users
router.get('/', userController.getAllUsers)

//ADD one users
router.post('/', userController.addUser)

//UPDATE user
router.put('/:id', userController.updateUser)

//DELETE user
router.delete('/:id', userController.deleteUser)

module.exports = router
