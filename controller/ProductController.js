
const Product = require('../models/Product');

// Create a new Product
exports.create_Product = async (req, res) => {
  
    const product = new Product({

    animal_id:req.body?.animal_id,
    "butcher_id": req.body?.butcher_id,
    "expirydate": req.body?.expirydate,
    "slaughterdate":req.body?.slaughterdate, 
    "productid":req.body?.productid
  });
  try {
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get All product
exports.get_products = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};


//Get product By Id
exports.getproductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if(!product) return res.status(404).send("Product not found");
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  };

// Update Distributor Field:
exports.updateproductById = async (req, res) => {
    try {
      const updatedData = await Product.findByIdAndUpdate(req.params.id, { distributor: req.body?.distributor }, { new: true });
      if (!updatedData) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.send(updatedData);
    } catch (err) {
      res.status(500).send(err);
    }
  };