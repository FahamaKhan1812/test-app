const express = require('express');
const router = express.Router();
const FarmController = require('../controller/FarmController');

router.post('/', FarmController.create_farm);


router.get('/', FarmController.get_farms);

module.exports = router;
