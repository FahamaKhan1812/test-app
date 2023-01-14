const Animal = require('../models/Animal');

// Create a new Animal
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

// Get All Animals
exports.get_animals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.send(animals);
  } catch (err) {
    res.status(500).send(err);
  }
};


//Get Animal By Id
exports.getanimalById = async (req, res) => {
    try {
      const animal = await Animal.findById(req.params.id);
      if(!animal) return res.status(404).send("animal not found");
      res.send(animal);
    } catch (err) {
      res.status(500).send(err);
    }
  };