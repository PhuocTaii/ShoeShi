const profileController = require('../controllers/profileController')
const router = require('express').Router()
const { isAdmin } = require('../middleware/authenticationMiddleware')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', isAdmin, profileController.getAdminProfilePage)

router.post('/:id', isAdmin, profileController.updateUser);

router.post('/:id/update-avatar', upload.single('adminImage'), profileController.updateAvatar)

router.post('/:id/checkPassword', isAdmin, profileController.checkPassword);

router.post('/:id/updatePassword', isAdmin, profileController.resetPassword);



module.exports = router