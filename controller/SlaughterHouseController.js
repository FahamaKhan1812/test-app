const SlaughterHouse = require("../models/SlaughterHouse");

// Create a new SlaughterHouse
exports.create_slaughterhouse = async (req, res) => {
  const slaughterHouse = new SlaughterHouse({
    name: req.body?.name,
    address: req.body?.address,
    owner_name: req.body?.owner_name,
    capacity: req.body?.capacity,
    role: req.body?.name,
  });
  try {
    await slaughterHouse.save();
    return res.status(200).json({
      success: true,
      message: [],
      distributors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

// Get All Slaughter houses
exports.get_slaughterhouses = async (req, res) => {
  try {
    const slaughterhouses = await SlaughterHouse.find();
    return res.status(200).json({
      success: true,
      message: [],
      slaughterhouses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

//Get Slaughterhouse By Id
exports.getSlaughterhouseById = async (req, res) => {
  try {
    const slaughterHouse = await SlaughterHouse.findById(req.params.id);
    if (!slaughterHouse)
      return res.status(404).json({
        success: false,
        message: `No slaughter house is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      slaughterHouse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
