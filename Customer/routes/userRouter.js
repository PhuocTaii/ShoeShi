const userController = require('../controllers/userController')
const router = require('express').Router()
const { isAuth, isAdmin } = require('../middleware/authenticationMiddleware')


router.get('/', isAuth, userController.getProfilePage)
// router.post('/', isAuth, userController.updateUser)

router.post('/:id', userController.updateUser);
// router.post('/update', isAuth, userController.updateUser)


module.exports = router
