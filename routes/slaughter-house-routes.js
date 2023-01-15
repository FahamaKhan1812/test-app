const express = require('express');
const router = express.Router();
const SlaughterHouseController = require('../controller/SlaughterHouseController');

router.post('/createnewslaughterhouse', SlaughterHouseController.create_slaughterhouse);
router.get('/getallslaughterhouses', SlaughterHouseController.get_slaughterhouses);
router.get('/getslaughterhousebyid:id', SlaughterHouseController.getSlaughterhouseById);

module.exports = router;
