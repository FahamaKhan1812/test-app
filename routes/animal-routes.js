const express = require('express');
const router = express.Router();
const AnimalController = require('../controller/AnimalController');

router.post('/', AnimalController.create_animal);


router.get('/', AnimalController.get_animals);

module.exports = router;
