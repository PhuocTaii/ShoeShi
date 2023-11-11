var express = require("express");
var router = express.Router();

/* GET login page. */
router.get("/", function (req, res, next) {
    res.render("auth/login", { layout: "layout/login" });
});

module.exports = router;
