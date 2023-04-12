const Farm = require("../models/Farm");
const Animal = require("../models/Animal");
const SlaughterHouse = require("../models/SlaughterHouse");
const Butcher = require("../models/Butcher");
const Product = require("../models/Product");

// Create a new Product
exports.create_Product = async (req, res) => {
  const product = new Product({
    animal_id: req.body?.animal_id,
    butcher_id: req.body?.butcher_id,
    expirydate: req.body?.expirydate,
    slaughterdate: req.body?.slaughterdate,
    productid: req.body?.productid,
  });
  try {
    await product.save();
    return res.status(200).json({
      success: true,
      message: [],
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// Get All product
exports.get_products = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: [],
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

// Update Distributor Field:
exports.updateproductById = async (req, res) => {
  try {
    const updatedData = await Product.findByIdAndUpdate(
      req.params.id,
      { distributor: req.body?.distributor },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: `No product is found with id ${req.params.id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: [],
      updatedData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

//Get product By Id
exports.getproductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: `No product is found with id ${req.params.id}`,
      });
    return res.status(200).json({
      success: true,
      message: [],
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

//Product report
exports.getproductReportById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      let string = product.productid;
      let parts = string.split(":");
      let farmID = parts[0].split("-")[0];
      let animalId = parts[0].split("-")[1];
      let slaughterId = parts[1].split("-")[0];
      let butcherId = parts[1].split("-")[1];

      // Find the farm in the database by its ID
      const animal = await Animal.findById(animalId);
      if (!animal) {
        return res.status(404).json({
          success: false,
          message: `No Animal is found with id ${animalId}`,
        });
      }

      const farm = await Farm.findById(farmID);
      if (!farm) {
        return res.status(404).json({
          success: false,
          message: `No Farm is found with id ${farm.farmID}`,
        });
      }

      const slaughter = await SlaughterHouse.findById(slaughterId);
      if (!slaughter) {
        res.status(404).json({
          success: false,
          message: `No Slaughter is found with id ${slaughterId}`,
        });
      }

      const butcher = await Butcher.findById(butcherId);
      if (!butcher) {
        res.status(404).json({
          success: false,
          message: `No butcher is found with id ${butcherId}`,
        });
      }
      // combine all the responses together
      const combinedResponse = { product, farm, slaughter, butcher, animal };
      return res.status(200).json({
        success: true,
        message: [],
        combinedResponse,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No Product is found with id ${req.params.id}`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
