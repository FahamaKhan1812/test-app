const express = require('express');
const router = express.Router();
const DistributorController = require('../controller/DistributorController');

router.post('/', DistributorController.create_distributor);


router.get('/', DistributorController.get_distributors);

module.exports = router;
