const express = require('express')
const { isAdmin } = require('../middleware/authenticationMiddleware')
const indexController = require('../controllers/indexController')
const router = express.Router()

/* GET home page. */
router.get('/', isAdmin , indexController.getAdminHomePage)

module.exports = router