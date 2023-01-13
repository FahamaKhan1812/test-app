// controllers/farmController.js
const Farm = require('../models/Farm');

// Create a new Farm
exports.create_farm = async (req, res) => {
  const farm = new Farm({
    farm_name: req.body?.farm_name,
    farm_address: req.body?.farm_address,
    role: req.body?.farm_name
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


