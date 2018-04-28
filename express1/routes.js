const express = require("express");

var router = express.Router();

router.get("/users/:username", function(req,res) {
	res.send("Hello " + req.params.username);
});

module.exports = router;
