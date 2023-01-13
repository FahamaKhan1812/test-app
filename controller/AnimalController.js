// controllers/farmController.js
const Animal = require('../models/Animal');

// Create a new Farm
exports.create_animal = async (req, res) => {
  const animal = new Animal({
    farm_id: req.body?.farm_id,
    breed_name: req.body?.breed_name,
    animal_dob: req.body?.animal_dob
  });
  try {
    await animal.save();
    res.send(animal);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get new farm
exports.get_animals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.send(animals);
  } catch (err) {
    res.status(500).send(err);
  }
};


