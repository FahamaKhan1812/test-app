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
    res.send(farm);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get new farm
exports.get_farms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.send(farms);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Get Farm By Id
exports.getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if(!farm) return res.status(404).send("Farm not found");
    res.send(farm);
  } catch (err) {
    res.status(500).send(err);
  }
};