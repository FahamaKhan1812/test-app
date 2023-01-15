// controllers/farmController.js
const Farm = require("../models/Farm");

// Create a new Farm
exports.create_farm = async (req, res) => {
  const farm = new Farm({
    farm_name: req.body?.farm_name,
    farm_address: req.body?.farm_address,
    role: req.body?.farm_name,
  });
  try {
    await farm.save();
    return res.status(200).json({
      success: true,
      message: [],
      farm,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// Get new farm
exports.get_farms = async (req, res) => {
  try {
    const farms = await Farm.find();
    return res.status(200).json({
      success: true,
      message: [],
      farms,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

//Get Farm By Id
exports.getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm)
      return res.status(404).json({
        success: false,
        message: `No farm is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      farm,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
