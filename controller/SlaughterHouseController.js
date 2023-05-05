const SlaughterHouse = require("../models/SlaughterHouse");
const Farm = require("../models/Farm");

// Create a new SlaughterHouse
exports.create_slaughterhouse = async (req, res) => {
  const slaughterHouse = new SlaughterHouse({
    name: req.body?.name,
    address: req.body?.address,
    owner_name: req.body?.owner_name,
    capacity: req.body?.capacity,
    farm_id: req.body?.farm_id,
  });
  try {
    await slaughterHouse.save();
    return res.status(200).json({
      success: true,
      slaughterHouse,
      message: [],
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
      data: slaughterHouse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
// Get Butchers Details By a SlaughterHouse_uuid
exports.getButchersBySlaughterHouse_uuid = async (req, res) => {
  try {
    const slaughterHouse = await SlaughterHouse.aggregate([
      { $match: { slaughterhouse_uuid: req.params.id } },
      {
        $lookup: {
          from: "butchers",
          localField: "slaughterhouse_uuid",
          foreignField: "slaughterid",
          as: "butcherData",
        },
      },
    ]);
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

exports.getSlaughterHouseByFarmId = async (req, res) => {
  const farm_Id = req.query;
  try {
    const slaughterHouse = await SlaughterHouse.find(farm_Id);
    if (slaughterHouse.length === 0)
      return res.status(404).json({
        success: false,
        message: `No slaughter house is found with id ${farm_Id.farm_Id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      data: slaughterHouse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
