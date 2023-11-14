const express = require("express");
const router = express.Router();

/* GET sign up page. */
router.get("/", function (req, res, next) {
    res.render("auth/signup", { layout: "layout/auth", extraStyles: "signup.css" });
});

module.exports = router;
