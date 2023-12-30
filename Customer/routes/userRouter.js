const userController = require('../controllers/userController')
const { isAuth } = require('../middleware/authenticationMiddleware');
const router = require('express').Router()

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', isAuth, userController.getProfilePage)

router.post('/:id', isAuth, userController.updateUser);

router.post('/:id/update-password',isAuth, userController.updatePassword)

router.post('/:id/update-avatar', upload.single('customerImage'), userController.updateAvatar)

module.exports = router
