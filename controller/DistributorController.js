const Distributor = require("../models/Distributor");
const User = require("../models/User");
const sterilizeUsersData = require("../utils/helper/sterilize.user.response");

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
    const distributorUsers =  await User.find({ role: "distributor" });
    if(distributorUsers.length === 0) {
     return res.status(200).json({
       success: true,
       message: "No information available",
     }); 
    }
    if (distributorUsers.length !== 0) {
      const m = await sterilizeUsersData(distributorUsers);
      return res.status(200).json({
        success: true,
        message: [],
        data: m,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error try again",
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
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
