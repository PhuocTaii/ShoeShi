const userController = require('../controllers/userController')
const { isAuth } = require('../middleware/authenticationMiddleware');
const router = require('express').Router()

router.get('/', isAuth, userController.getProfilePage)
// router.post('/', isAuth, userController.updateUser)

router.post('/:id', userController.updateUser);
// router.post('/update', isAuth, userController.updateUser)

router.post('/:id/update-password',isAuth, userController.updatePassword)

module.exports = router
