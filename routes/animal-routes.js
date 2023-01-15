const express = require('express');
const router = express.Router();
const AnimalController = require('../controller/AnimalController');

router.post('/addnewanimal', AnimalController.create_animal);
router.get('/getallanimals', AnimalController.get_animals);
router.get('/getanimalbyid:id', AnimalController.getanimalById);

module.exports = router;
