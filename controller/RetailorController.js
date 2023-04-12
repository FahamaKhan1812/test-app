const Retailor = require("../models/Retailor");

//  Create a new distributor
exports.create_retailor = async (req, res) => {
  const retailor = new Retailor({
    name: req.body?.name,
    username: req.body?.username,
    password: req.body?.password,
    role: req.body?.name,
  });
  try {
    await retailor.save();
    return res.status(200).json({
      success: true,
      message: [],
      retailor,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// Get All Retailors
exports.get_retailors = async (req, res) => {
  try {
    const retailors = await Retailor.find();
    return res.status(200).json({
      success: true,
      message: [],
      retailors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

//Get Retailor By Id
exports.getretailorById = async (req, res) => {
  try {
    const retailor = await Retailor.findById(req.params.id);
    if (!retailor)
      return res.status(404).json({
        success: false,
        message: `No retailor is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      retailor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
