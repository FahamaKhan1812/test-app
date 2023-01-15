const Animal = require("../models/Animal");

// Create a new Animal
exports.create_animal = async (req, res) => {
  const animal = new Animal({
    farm_id: req.body?.farm_id,
    breed_name: req.body?.breed_name,
    animal_dob: req.body?.animal_dob,
  });
  try {
    await animal.save();
    return res.status(200).json({
      success: true,
      message: [],
      animal,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// Get All Animals
exports.get_animals = async (req, res) => {
  try {
    const animals = await Animal.find();
    return res.status(200).json({
      success: true,
      message: [],
      animals,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

//Get Animal By Id
exports.getanimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal)
      return res.status(404).json({
        success: false,
        message: `No animal is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      animal,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
