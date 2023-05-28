// controllers/userController.js
const User = require("../models/User");
const sterilizeUsersData = require("../utils/helper/sterilize.user.response");

exports.create_user = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    farm: req.body.farm,
  });
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      const m = await sterilizeUsersData(users);

      return res.status(200).json({
        success: true,
        message: [],
        data: m,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server error try again"],
      error: err,
    });
  }
};

// Get User by their Ids
exports.getUserById = async (req, res) => {
  const { farm_Id, slaughter_house_Id } = req.query;
  let filter = {};

  if (farm_Id) {
    filter.farm_Id = farm_Id;
  }

  if (slaughter_house_Id) {
    filter.slaughter_house_Id = slaughter_house_Id;
  }

  try {
    const users = await User.find(filter);

    if (users.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No users found.",
        data: []
      });
    } else {
      return res.status(200).json({
        success: true,
        message: [],
        data: await sterilizeUsersData(users),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User by their Id
exports.updateUserById = async (req, res) => {
  const { _id, userStatus, username, email } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.user_status = userStatus || user.user_status;
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();
    res.json({
      success: true,
      message: "User information updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
