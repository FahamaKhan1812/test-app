const Butcher = require("../models/Butcher");

// Create a new Butcher
exports.create_butcher = async (req, res) => {
  const butcher = new Butcher({
    name: req.body?.name,
    nic: req.body?.nic,
    slaughterid: req.body?.slaughterid,
  });
  try {
    await butcher.save();
    return res.status(200).json({
      success: true,
      message: [],
      butcher,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// Get All butchers
exports.get_butchers = async (req, res) => {
  try {
    const butchers = await Butcher.find();
    return res.status(200).json({
      success: true,
      message: [],
      butchers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

//Get Butcher By Id
exports.getbutcherById = async (req, res) => {
  try {
    const butcher = await Butcher.findById(req.params.id);
    if (!butcher)
      return res.status(404).json({
        success: false,
        message: `No butcher is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      butcher,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
