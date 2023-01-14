const express = require('express');
const router = express.Router();
const SlaughterHouseController = require('../controller/SlaughterHouseController');

router.post('/', SlaughterHouseController.create_slaughterhouse);


router.get('/', SlaughterHouseController.get_slaughterhouses);
router.get('/:id', SlaughterHouseController.getSlaughterhouseById);

module.exports = router;
