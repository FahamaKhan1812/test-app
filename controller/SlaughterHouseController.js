// controllers/farmController.js
const SlaughterHouse = require('../models/SlaughterHouse');

// Create a new SlaughterHouse
exports.create_slaughterhouse = async (req, res) => {
  const slaughterHouse = new SlaughterHouse({
    name: req.body?.name,
    address: req.body?.address,
    owner_name: req.body?.owner_name,
    capacity:req.body?.capacity,
    role:req.body?.name
  });
  try {
    await slaughterHouse.save();
    res.send(slaughterHouse);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get new farm
exports.get_slaughterhouses = async (req, res) => {
  try {
    const slaughterhouses = await SlaughterHouse.find();
    res.send(slaughterhouses);
  } catch (err) {
    res.status(500).send(err);
  }
};


