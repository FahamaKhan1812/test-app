const express = require('express');
const router = express.Router();
const DistributorController = require('../controller/DistributorController');

router.post('/', DistributorController.create_distributor);


router.get('/', DistributorController.get_distributors);
router.get('/:id', DistributorController.getdistributorById);

module.exports = router;
