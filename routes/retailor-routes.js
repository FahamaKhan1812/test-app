const express = require('express');
const router = express.Router();
const RetailorController = require('../controller/RetailorController');

router.post('/createnewretailor', RetailorController.create_retailor);
router.get('/getallretailors', RetailorController.get_retailors);
router.get('/getretailorbyid:id', RetailorController.getretailorById);

module.exports = router;
