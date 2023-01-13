const express = require("express");
const router = express.Router();
const superAdminController = require("../controller/SuperAdminController");

router.post("/", superAdminController.create_super_admin);

module.exports = router;
