const Animal = require("../models/Animal");

// Create a new Animal
exports.create_animal = async (req, res) => {
  const animal = new Animal({
    breed_name: req.body?.breed_name,
    animal_dob: req.body?.animal_dob,
    farm_Id: req.body?.farm_Id,
    user_Id: req.body?.user_Id,
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
  const farm_id = req.query;
  try {
    const animal = await Animal.find(farm_id);
    if (animal.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No animal data is found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: [],
      data: animal,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
