const userController = require('../controllers/userController')
const router = require('express').Router()

router.get('/', userController.getProfilePage)

module.exports = router
