const Distributor = require('../models/Distributor');

//  Create a new distributor
exports.create_distributor = async (req, res) => {
  const distributor = new Distributor({
    name: req.body?.name,
    username: req.body?.username,
    password: req.body?.password,
    role:req.body?.name
  });
  try {
    await distributor.save();
    res.send(distributor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get All distributors
exports.get_distributors = async (req, res) => {
  try {
    const distributors = await Distributor.find();
    res.send(distributors);
  } catch (err) {
    res.status(500).send(err);
  }
};


//Get Distributor By Id
exports.getdistributorById = async (req, res) => {
    try {
      const distributor = await Distributor.findById(req.params.id);
      if(!distributor) return res.status(404).send("distributor not found");
      res.send(distributor);
    } catch (err) {
      res.status(500).send(err);
    }
  };