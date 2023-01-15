const express = require('express');
const router = express.Router();
const ButcherController = require('../controller/ButcherController');

router.post('/createnewbutcher', ButcherController.create_butcher);
router.get('/getallbutchers', ButcherController.get_butchers);
router.get('/getbutcherbyid:id', ButcherController.getbutcherById);

module.exports = router;
