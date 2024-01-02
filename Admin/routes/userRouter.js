const userController = require('../controllers/userController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//GET all users
// router.get('/', isAdmin, userController.getAllUsers)

//DELETE user
router.delete('/:id', isAdmin, userController.deleteUser)

//Client side
router.get('/', isAdmin, userController.getAccountsPage)
router.get('/api', isAdmin, userController.handlePaging)

router.get('/profile', isAdmin, userController.getAdminProfilePage)

module.exports = router
