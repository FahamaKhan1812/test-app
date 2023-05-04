const Farm = require("../models/Farm");
const Animal = require("../models/Animal");
const SlaughterHouse = require("../models/SlaughterHouse");
const Butcher = require("../models/Butcher");
const Product = require("../models/Product");
const Distributor = require("../models/Distributor");
const Retailor = require("../models/Retailor");

// Create a new Product
exports.create_Product = async (req, res) => {
  const productid = req.body?.productid;
  const existingProduct = await Product.findOne({ productid });

  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product with this ID already exists",
    });
  }

  const slaughterdate = new Date(req.body?.slaughterdate.replace(/-/g, "/"));
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  if (slaughterdate.toDateString() !== currentDate.toDateString()) {
    return res.status(400).json({
      success: false,
      message: "Slaughter date must be the current date",
    });
  }

  const expirydate = new Date(req.body?.expirydate.replace(/-/g, "/"));

  if (expirydate < currentDate) {
    return res.status(400).json({
      success: false,
      message: "Expiry date cannot be a past date",
    });
  }
  try {
    const animal = await Animal.findOne({ _id: req.body?.animal_id });

    if (!animal || animal.animalSlaughteredStatus !== "true") {
      return res.status(400).json({
        success: false,
        message: "Animal slaughter status is false",
      });
    }

    const product = new Product({
      animal_id: req.body?.animal_id,
      butcher_id: req.body?.butcher_id,
      expirydate: formattedDate,
      slaughterdate: slaughterdate.toISOString().slice(0, 10),
      productid,
    });

    await product.save();
    return res.status(200).json({
      success: true,
      message: [],
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
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
exports.updateproductdistributorById = async (req, res) => {
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

exports.updateproductretailorById = async (req, res) => {
  try {
    const updatedData = await Product.findByIdAndUpdate(
      req.params.id,
      { retailor: req.body?.retailor },
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

exports.productbyretailor= async (req,res) => {
    try {
      const products = await Product.find({ "retailor": req.params.retailorID });
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

  exports.productbydistributor= async (req,res) => {
    try {
      const products = await Product.find({ "distributor": req.params.distributorID });
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

//Mobile API:
exports.ProductReport = async (req, res) => {
  console.log(req.body);
  try {
    let animal = "";
    // let AnimalStatus = true;
    try {
      animal = await Animal.findById(req.body?.ANIMALID);
    } catch {}

    if (!animal) {
      // AnimalStatus = false;
      animal = {
        animal_uuid: 'Not Found',
        animal_dob: 'Not Found',
        breed_name: 'Not Found',
      };
    }

    let farm = "";
    let FarmStatus = true;
    try {
      farm = await Farm.findById(req.body?.FARMID);
    } catch {}
    if (!farm) {
      FarmStatus = false;
      farm = {
        farm_name: "Not Found",
        farm_address: "Not Found",
      };
    }

    let slaughter = "";
    let SlaughterStatus = true;
    try {
      slaughter = await SlaughterHouse.findById(req.body?.SLAUGHTERID);
    } catch {}

    if (!slaughter) {
      SlaughterStatus = false;
      slaughter = {
        address: 'Not Found',
        name: 'Not Found',
        owner_name: 'Not Found',
      };
    }


    let butcher = "";
    // let ButcherStatus = true;
    try {
      butcher = await Butcher.findById(req.body?.BUTCHERID);
    } catch {}
    if (!butcher) {
      // ButcherStatus = false;
      butcher = {
        nic: "Not Found",
        name: "Not Found",
      };
    }


    let distributor="";
    let DistributorStatus=true;
    try{
      distributor = await Distributor.findById(req.body?.DISTRIBUTORID);
    }catch{}
    if (!distributor){
      DistributorStatus=false;
      distributor = {
      distributor_uuid: 'Not Found',
      name: 'Not Found',
    };}


    let retailor=null; 
    let RetailorStatus=true;
    try{
      retailor = await Retailor.findById(req.body?.RETAILORID);
    }catch{}

    if (!retailor) {
      RetailorStatus=false;
      retailor={
      "retailor_uuid": "Not Found",
      "name": "Not Found",};      
    }

    const ProductReportResult = { farm, slaughter, butcher, animal,retailor,distributor };
    const Status ={"FarmStatus":FarmStatus,"SlaughterStatus":SlaughterStatus,"DistributorStatus":DistributorStatus,"RetailorStatus":RetailorStatus};
    
    const FilteredReport= filterReport(ProductReportResult);
    return res.status(200).json({
      success: true,
      message: Status,
      // ProductReportResult,
      FilteredReport,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error try again"],
      error: err,
    });
  }
};

function filterReport(response) {
  const filteredResponse = {
    "Farm Name": response.farm.farm_name,
    "Farm Address": response.farm.farm_address,
    "Animal TAG": response.animal.animal_uuid,
    "Animal DOB": response.animal.animal_dob,
    "Breed": response.animal.breed_name,
    "Slaughter Name": response.slaughter.name,
    "Slaughter Address": response.slaughter.address,
    "Owner Name": response.slaughter.owner_name,
    "Butcher Name": response.butcher.name,
    "Butcher ID": response.butcher.nic,
    "Distributor ID": response.distributor.distributor_uuid,
    "Distributor Name": response.distributor.name,
    "Retailor ID": response.retailor.retailor_uuid,
    "Retailor Name": response.retailor.name
  };
  return filteredResponse;
}

