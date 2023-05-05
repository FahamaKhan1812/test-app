const Farm = require("../models/Farm");
const Animal = require("../models/Animal");
const SlaughterHouse = require("../models/SlaughterHouse");
const Butcher = require("../models/Butcher");
const Product = require("../models/Product");
const Distributor=require("../models/Distributor");
const Retailor=require("../models/Retailor");

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
        animal_uuid: "Not found",
        breed_name: "Not found",
        animal_dob: "Not found",
        createdAt: "Not found",
        animal_breedingStatus: "Not found",
        animal_healthStatus: "Not found",
        animal_injuryStatus: "Not found",
        animal_medication: "Not found",
        animal_weight: "Not found",
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
        "FarmName": response.farm.farm_name,
        "FarmAddress": response.farm.farm_address,
        "AnimalTAG": response.animal.animal_uuid,
        "AnimalDOB": response.animal.animal_dob,
        "ArrivalTime":response.animal.createdAt,
        "Breed": response.animal.breed_name,
        "CattleWeight":response.animal.animal_weight,
        "CattleGender":response.animal.animal_breedingStatus,
        "Medication": response.animal.animal_medication,
        "InjuryStatus": response.animal.animal_injuryStatus,
        "HealthStatus":response.animal.animal_healthStatus,
        "SlaughterName": response.slaughter.name,
        "SlaughterAddress": response.slaughter.address,
        "OwnerName": response.slaughter.owner_name,
        "ButcherName": response.butcher.name,
        "ButcherNIC": response.butcher.nic,    
        "DistributorReg": response.distributor.distributor_uuid,
        "DistributorName": response.distributor.name,
        "RetailorReg": response.retailor.retailor_uuid,
        "RetailorName": response.retailor.name
  };
  return filteredResponse;
}

