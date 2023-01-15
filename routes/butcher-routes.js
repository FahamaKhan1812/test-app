const express = require('express');
const router = express.Router();
const ButcherController = require('../controller/ButcherController');

router.post('/', ButcherController.create_butcher);


router.get('/', ButcherController.get_butchers);

router.get('/:id', ButcherController.getbutcherById);

module.exports = router;
