var express = require("express");
var router = express.Router();

/* GET login page. */
router.get("/", function (req, res, next) {
    res.render("auth/signup", { layout: "layout/signup", title: "Signup" });
});

module.exports = router;
