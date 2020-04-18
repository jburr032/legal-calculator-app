const express = require("express");
const router = express.Router();

// @route GET uk/
// @desc Landing route
// @access Public
router.get("/", (req, res) => res.send("LANDING route"));

module.exports = router;
