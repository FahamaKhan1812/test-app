const express = require('express');
const router = express.Router();
const DistributorController = require('../controller/DistributorController');

router.post('/createnewdistributor', DistributorController.create_distributor);
router.get('/getalldistributors', DistributorController.get_distributors);
router.get('/getdistributorbyid:id', DistributorController.getdistributorById);

module.exports = router;
