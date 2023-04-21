const SuperAdmin = require("../models/SuperAdmin");

exports.create_super_admin = async (req, res) => {
  const superAdmin = new SuperAdmin({
    name: req.body?.name,
    password: req.body?.password,
  });
  try {
    await superAdmin.save();
    res.send(superAdmin);
  } catch (err) {
    res.status(400).send(err);
  }
};
