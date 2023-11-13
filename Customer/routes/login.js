const express = require("express");
const router = express.Router();

/* GET login page. */
router.get("/", function (req, res, next) {
    res.render("auth/login", { layout: "layout/auth", extraStyles: 'login.css' });
});

module.exports = router;
