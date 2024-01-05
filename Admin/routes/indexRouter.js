const express = require('express')
const { isAdmin } = require('../middleware/authenticationMiddleware')
const indexController = require('../controllers/indexController')
const router = express.Router()

/* GET home page. */
router.get('/', isAdmin, indexController.getAdminHomePage)

router.post('/chartdata', isAdmin, indexController.getChartData)
router.post('/tabledata', isAdmin, indexController.getTableData)

module.exports = router