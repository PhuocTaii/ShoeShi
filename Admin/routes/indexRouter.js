const express = require('express')
const { isAdmin } = require('../middleware/authenticationMiddleware')
const indexController = require('../controllers/indexController')
const router = express.Router()

/* GET home page. */
router.post('/chartdata', indexController.getChartData)
router.get('/', indexController.getAdminHomePage)
// router.get('/', isAdmin , indexController.getAdminHomePage)

module.exports = router