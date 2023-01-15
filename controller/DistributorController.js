const Distributor = require("../models/Distributor");

//  Create a new distributor
exports.create_distributor = async (req, res) => {
  const distributor = new Distributor({
    name: req.body?.name,
    username: req.body?.username,
    password: req.body?.password,
    role: req.body?.name,
  });
  try {
    await distributor.save();
    return res.status(200).json({
      success: true,
      message: [],
      distributor,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// Get All distributors
exports.get_distributors = async (req, res) => {
  try {
    const distributors = await Distributor.find();
    return res.status(200).json({
      success: true,
      message: [],
      distributors,
    });
  } catch (err) {
    return res.status(500).json({
      success: fasle,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

//Get Distributor By Id
exports.getdistributorById = async (req, res) => {
  try {
    const distributor = await Distributor.findById(req.params.id);
    if (!distributor)
      return res.status(404).json({
        success: false,
        message: `No distributor is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      distributor,
    });
  } catch (err) {
    return res.status(500).json({
      success: fasle,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
