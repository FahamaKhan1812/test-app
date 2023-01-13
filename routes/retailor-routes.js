const express = require('express');
const router = express.Router();
const RetailorController = require('../controller/RetailorController');

router.post('/', RetailorController.create_retailor);


router.get('/', RetailorController.get_retailors);

module.exports = router;
