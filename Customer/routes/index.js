var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("home/index", { layout: "layout/home" });
});

module.exports = router;
