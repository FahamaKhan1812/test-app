// controllers/userController.js
const User = require("../models/user");

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
