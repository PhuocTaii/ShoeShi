var express = require('express');
var router = express.Router();

/* GET accounts page. */
router.get('/', function(req, res, next) {
  res.render('accounts/index', {extraStyles: 'accounts.css'});
});

module.exports = router;
