
const Butcher = require('../models/Butcher');

// Create a new Butcher
exports.create_butcher = async (req, res) => {
  const butcher = new Butcher({
    name: req.body?.name,
    nic: req.body?.nic,
    slaughterid: req.body?.slaughterid,
  });
  try {
    await butcher.save();
    res.send(butcher);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get All butchers
exports.get_butchers = async (req, res) => {
  try {
    const butchers = await Butcher.find();
    res.send(butchers);
  } catch (err) {
    res.status(500).send(err);
  }
};


//Get Butcher By Id
exports.getbutcherById = async (req, res) => {
    try {
      const butcher = await Butcher.findById(req.params.id);
      if(!butcher) return res.status(404).send("Butcher not found");
      res.send(butcher);
    } catch (err) {
      res.status(500).send(err);
    }
  };