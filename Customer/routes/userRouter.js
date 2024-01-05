const userController = require('../controllers/userController')
const { isAuth } = require('../middleware/authenticationMiddleware');
const router = require('express').Router()

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', isAuth, userController.getProfilePage)

router.post('/:id', isAuth, userController.updateUser);

router.post('/:id/updatePassword',isAuth, userController.resetPassword)

router.post('/:id/checkPassword', isAuth, userController.checkPassword);

router.post('/:id/update-avatar', upload.single('customerImage'), userController.updateAvatar)

module.exports = router
