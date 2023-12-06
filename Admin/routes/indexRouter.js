const express = require('express')
const { isAuth, isAdmin } = require('../middleware/authenticationMiddleware')
const indexController = require('../controllers/indexController')
const router = express.Router()

/* GET home page. */
router.get('/', indexController.getAdminHomePage)

module.exports = router