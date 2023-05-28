const Animal = require("../models/Animal");
const Butchers = require("../models/Butcher");

// Create a new Animal
exports.create_animal = async (req, res) => {
  const animal = new Animal({
    breed_name: req.body?.breed_name,
    animal_dob: req.body?.animal_dob,
    animal_weight: req.body?.animal_weight,
    animal_medication: req.body?.animal_medication,
    animal_breedingStatus: req.body?.animal_breedingStatus,
    animal_healthStatus: req.body?.animal_healthStatus,
    animal_injuryStatus: req.body?.animal_injuryStatus,
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

// Get Animal By Id
exports.getanimalById = async (req, res) => {
  const farm_Id = req.query;
  try {
    const animals = await Animal.find(farm_Id);
    if (animals.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No animal data is found",
        data: [],
      });
    }

    const modifiedAnimalData = await Promise.all(
      animals.map(async (animal) => {
        const butcher = await Butchers.findOne({
          _id: animal.animalSlaughteredByButcherId,
        });
        return {
          ...animal.toObject(),
          "Slaughtered By": butcher ? butcher.name : null,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      message: [],
      data: modifiedAnimalData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

// Update Animal By Id
exports.updateAnimalById = async (req, res) => {
  const animal_id = req.params.id;
  const updatedAnimalData = req.body;
  try {
    const animal = await Animal.findByIdAndUpdate(animal_id, updatedAnimalData);
    if (
      animal.animalSlaughteredStatus === "true" &&
      animal.animalSlaughteredByButcherId ===
        animal.animalSlaughteredByButcherId
    ) {
      return res.status(403).json({
        message: "Animal has already been slaughtered and cannot be updated",
      });
    }

    if (!animal) {
      return res.status(400).json({
        success: false,
        message: `Animal not found with id ${animal_id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
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



