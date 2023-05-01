const Butcher = require("../models/Butcher");

// Create a new Butcher
exports.create_butcher = async (req, res) => {
  const butcher = new Butcher({
    name: req.body?.name,
    nic: req.body?.nic,
    address: req.body?.address,
    age: req.body?.age,
    contactno: req.body?.contactno,
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

//Get Butcher By Slaughter House Id
exports.getbutcherById = async (req, res) => {
  const slaughterid = req.query;
  try {
    const butcher = await Butcher.find(slaughterid);
    if (butcher.length === 0)
      return res.status(404).json({
        success: false,
        message: `No butcher is found with id ${slaughterid.slaughterid}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      data: butcher,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};