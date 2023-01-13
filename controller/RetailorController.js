// controllers/farmController.js
const Retailor = require('../models/Retailor');

//  Create a new distributor
exports.create_retailor = async (req, res) => {
  const retailor = new Retailor({
    name: req.body?.name,
    username: req.body?.username,
    password: req.body?.password,
    role:req.body?.name
  });
  try {
    await retailor.save();
    res.send(retailor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get new farm
exports.get_retailors = async (req, res) => {
  try {
    const retailors = await Retailor.find();
    res.send(retailors);
  } catch (err) {
    res.status(500).send(err);
  }
};


