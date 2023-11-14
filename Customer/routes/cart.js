var express = require("express");
var router = express.Router();

/* GET cart page. */
router.get("/", function (req, res, next) {
    res.render("cart/index", { extraStyles: "cart.css", title: "Cart" });
});

module.exports = router;
