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
      success: fasle,
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
      success: fasle,
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
      success: fasle,
      message: ["Server Error try again"],
      error: err,
    });
  }
};
