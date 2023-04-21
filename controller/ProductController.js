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

//Mobile API:
exports.ProductReport = async (req, res) => {
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



//Product report
exports.getproductReportById = async (req, res) => {
  try {
    
    const product = await Product.findById(req.params.id);
    if (product) {
      let string = product.productid;   //"P001-A01:S11-b001"
      let parts = string.split(":");     //["P001-A01"],["S11-b001"]
      let farmID = parts[0].split("-")[0];    //"P001"
      let animalId = parts[0].split("-")[1];   //
      let slaughterId = parts[1].split("-")[0];
      let butcherId = parts[1].split("-")[1];
console.log(farmID,animalId,slaughterId,butcherId);


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
      // combinedResponse = sterilizeResponse(combinedResponse)
      return res.status(200).json({
        success: true,
        message: [],
        productresult: sterilizeResponse(combinedResponse),
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

// Test serlize
function sterilizeResponse(originalResponse) {
  const sterilizedResponse = {
    farm: {
      farm_name: originalResponse.farm.farm_name,
      farm_address: originalResponse.farm.farm_address,
    },
    slaughter: {
      name: originalResponse.slaughter.name,
      address: originalResponse.slaughter.address,
      owner_name: originalResponse.slaughter.owner_name,
      capacity: originalResponse.slaughter.capacity,
    },
    butcher: {
      name: originalResponse.butcher.name,
      nic: originalResponse.butcher.nic,
    },
    animal: {
      breed_name: originalResponse.animal.breed_name,
      animal_dob: originalResponse.animal.animal_dob,
      createdAt: originalResponse.animal.createdAt,
      updatedAt: originalResponse.animal.updatedAt,
    },
  };
  return sterilizedResponse;
}
