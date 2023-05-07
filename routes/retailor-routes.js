const express = require('express');
const router = express.Router();
const RetailorController = require('../controller/RetailorController');
const { userAuth, checkRole } = require("../utils/Auth");

router.post('/createnewretailor', RetailorController.create_retailor);
router.get('/getallretailors',
userAuth,
checkRole(["superadmin"]),
RetailorController.get_retailors);
router.get('/getretailorbyid:id', RetailorController.getretailorById);

module.exports = router;
