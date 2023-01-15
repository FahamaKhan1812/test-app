const SlaughterHouse = require('../models/SlaughterHouse');

// Create a new SlaughterHouse
exports.create_slaughterhouse = async (req, res) => {
  const slaughterHouse = new SlaughterHouse({
    name: req.body?.name,
    address: req.body?.address,
    owner_name: req.body?.owner_name,
    capacity:req.body?.capacity,
    role:req.body?.name
  });
  try {
    await slaughterHouse.save();
    res.send(slaughterHouse);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get All Slaughter houses
exports.get_slaughterhouses = async (req, res) => {
  try {
    const slaughterhouses = await SlaughterHouse.find();
    res.send(slaughterhouses);
  } catch (err) {
    res.status(500).send(err);
  }
};


//Get Slaughterhouse By Id
exports.getSlaughterhouseById = async (req, res) => {
    try {
      const slaughterHouse = await SlaughterHouse.findById(req.params.id);
      if(!slaughterHouse) return res.status(404).send("SlaughterHouse not found");
      res.send(slaughterHouse);
    } catch (err) {
      res.status(500).send(err);
    }
  };