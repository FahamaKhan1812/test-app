const express = require('express');
const router = express.Router();
const FarmController = require('../controller/FarmController');

router.post('/createnewfarm', FarmController.create_farm);
router.get('/getallfarms', FarmController.get_farms);
router.get('/getfarmbyid:id', FarmController.getFarmById);
module.exports = router;
