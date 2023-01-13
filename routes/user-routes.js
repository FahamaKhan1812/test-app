const express = require("express");
const router = express.Router();
const userController = require("../controller/User");

router.post("/", userController.create_user);

module.exports = router;
