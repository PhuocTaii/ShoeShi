const express = require('express')
const { isAdmin } = require('../middleware/authenticationMiddleware')
const indexController = require('../controllers/indexController')
const router = express.Router()

/* GET home page. */
router.get('/', indexController.getAdminHomePage)

router.post('/chartdata', indexController.getChartData)
router.post('/tabledata', indexController.getTableData)

// router.get('/', isAdmin , indexController.getAdminHomePage)

module.exports = router