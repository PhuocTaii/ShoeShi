const userController = require('../controllers/userController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')

//ADD one admin
router.post('/', isAdmin, userController.addAdmin)

//DELETE user
router.delete('/:id', isAdmin, userController.deleteUser)

//Client side
router.get('/', isAdmin, userController.getAccountsPage)
router.get('/api', isAdmin, userController.handlePaging)

router.get('/:id', userController.getUserById)

router.post('/ban/:id', userController.banAccount)

module.exports = router
