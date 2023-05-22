
const moment = require('moment');
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
      message: "Not Allowed to create product. If product already exists",
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
      data: product,
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
      message: "Server Error try again",
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
      { new: true },
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
      data: updatedData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error try again",
      error: err,
    });
  }
};

// Update Retailor Field:
exports.updateproductretailorById = async (req, res) => {
  try {
    const updatedData = await Product.findByIdAndUpdate(
      req.params.id,
      { retailor: req.body?.retailor },
      { new: true },
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
      data: updatedData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error try again",
      error: err,
    });
  }
};

//Filter products For retailor using retailorID
exports.productbyretailor = async (req, res) => {
  try {
    const products = await Product.find({ retailor: req.params.retailorID });
    return res.status(200).json({
      success: true,
      message: [],
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error try again",
      error: err,
    });
  }
};

//DataSet For retailor Dashboard using retailorID
exports.retailorDataset = async (req, res) => {
  try {
    const RecentProducts = await Product.find({
      retailor: req.params.retailorID,
    }).sort({ updatedAt: -1 }).limit(5);

    const dateRange = req.query.dateRange || '1week';
    const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
    const endDate = moment().startOf('day');

    const datesRange = [];
    const currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      datesRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');}

    const productsInRange = await Product.aggregate([
      {
        $match: { retailor: req.params.retailorID,
          updatedAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }}
      },
      { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          count: { $sum: 1 } }
      },
      { $project: {
          _id: 0,
          date: "$_id",
          count: 1} }
    ]);

    const productsInRangeWithMissingDays = datesRange.map(date => {
      const product = productsInRange.find(p => p.date === date);
      return {
        date,
        count: product ? product.count : 0 };
    });
    const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
      (result, { date, count }) => {
        result.x_axis.push(date);
        result.y_axis.push(count);
        return result;
      },
      { x_axis: [], y_axis: [] }
    );
    return res.status(200).json({
      success: true,
      message: [],
      chart_data: { x_axis, y_axis },
      RecentProducts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error. Please try again.',
      error: err.message,
    });
  }
};

//
exports.SuperAdminRetailerDataset = async (req, res) => {
  try {
  const RecentProducts = await Product.find({
  retailor: { $exists: true },
  }).sort({ updatedAt: -1 }).limit(5);

  const dateRange = req.query.dateRange || '1week';
  const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
  const endDate = moment().startOf('day');
  
  const datesRange = [];
  const currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate)) {
    datesRange.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'day');
  }
  
  const productsInRange = await Product.aggregate([
    {
      $match: {
        retailor: { $exists: true },
        updatedAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1
      }
    }
  ]);
  
  const productsInRangeWithMissingDays = datesRange.map(date => {
    const product = productsInRange.find(p => p.date === date);
    return {
      date,
      count: product ? product.count : 0
    };
  });
  
  const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
    (result, { date, count }) => {
      result.x_axis.push(date);
      result.y_axis.push(count);
      return result;
    },
    { x_axis: [], y_axis: [] }
  );
  
  return res.status(200).json({
    success: true,
    message: [],
    chart_data: { x_axis, y_axis },
    RecentProducts,
  });
  
} catch (err) {
  return res.status(500).json({
  success: false,
  message: 'Server Error. Please try again.',
  error: err.message,
  });
  }
  };

//Filter products For distributor using distibutorID
exports.productbydistributor = async (req, res) => {
  try {
    const products = await Product.find({
      distributor: req.params.distributorID,
    });
    return res.status(200).json({
      success: true,
      message: [],
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error try again",
      error: err,
    });
  }
};

//DataSet For Distributor Dashboard using DistributorID
exports.distributorDataset = async (req, res) => {
  try {
    const RecentProducts = await Product.find({
      distributor: req.params.distributorID,
      retailor: { $exists: false },
    }).sort({ updatedAt: -1 }).limit(5);

    const dateRange = req.query.dateRange || '1week';
    const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
    const endDate = moment().startOf('day');

    const datesRange = [];
    const currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      datesRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');
    }

    const productsInRange = await Product.aggregate([
      {
        $match: {
          distributor: req.params.distributorID,
          retailor: { $exists: false },
          updatedAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1
        }
      }
    ]);

    const productsInRangeWithMissingDays = datesRange.map(date => {
      const product = productsInRange.find(p => p.date === date);
      return {
        date,
        count: product ? product.count : 0
      };
    });

    const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
      (result, { date, count }) => {
        result.x_axis.push(date);
        result.y_axis.push(count);
        return result;
      },
      { x_axis: [], y_axis: [] }
    );

    return res.status(200).json({
      success: true,
      message: [],
      chart_data: { x_axis, y_axis },
      RecentProducts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error. Please try again.',
      error: err.message,
    });
  }
};
// SuperAdminDashboard of distributor
exports.SuperAdmindistributorDataset= async (req,res) =>{
  try {
    const RecentProducts = await Product.find({
      distributor: { $exists: true },
      retailor: { $exists: false },
    }).sort({ updatedAt: -1 }).limit(5);

    const dateRange = req.query.dateRange || '1week';
    const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
    const endDate = moment().startOf('day');

    const datesRange = [];
    const currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      datesRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');}

    const productsInRange = await Product.aggregate([
      {
        $match: {
          distributor: { $exists: true },
          retailor: { $exists: false },
          updatedAt: { $gte: startDate.toDate(), $lte: endDate.toDate()}}
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1}
      }
    ]);
    const productsInRangeWithMissingDays = datesRange.map(date => {
      const product = productsInRange.find(p => p.date === date);
      return { date,
        count: product ? product.count : 0};
    });
    const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
      (result, { date, count }) => {
        result.x_axis.push(date);
        result.y_axis.push(count);
        return result;},
      { x_axis: [], y_axis: [] });
    return res.status(200).json({
      success: true,
      message: [],
      chart_data: { x_axis, y_axis },
      RecentProducts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error. Please try again.',
      error: err.message,
    });
  }
};

//DataSet For SlaughterHouse Dashboard using slaughterhouseID
exports.SlaughterHouseDataset = async (req, res) => {
  const slaughterhouseId = req.params.slaughterhouseID;
  try {
    const RecentProducts = await Product.find({
      productid: { $regex: new RegExp(`:${slaughterhouseId}:`) }
    }).sort({ createdAt: -1 }).limit(5);

    // Extract animalId from RecentProducts
    const animalIds = RecentProducts.map(product => product.productid.split(':')[1]);
    
    // Retrieve corresponding animals from Animal model
    const RecentSlaughters = await Animal.find({ _id: { $in: animalIds } });

    const dateRange = req.query.dateRange || '1week';
    const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
    const endDate = moment().startOf('day');

    const datesRange = [];
    const currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      datesRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');}

    const productsInRange = await Product.aggregate([
      {$match: {
      productid: { $regex: new RegExp(`:${slaughterhouseId}:`) },
      createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }}
      },
      {$group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
      count: { $sum: 1 }}},
      {$project: {
      _id: 0,
      date: "$_id",
      count: 1}}
      ]);

    const productsInRangeWithMissingDays = datesRange.map(date => {
      const product = productsInRange.find(p => p.date === date);
      return {
        date,
        count: product ? product.count : 0
      };
    });

    const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
      (result, { date, count }) => {
        result.x_axis.push(date);
        result.y_axis.push(count);
        return result;
      },
      { x_axis: [], y_axis: [] }
    );

    return res.status(200).json({
      success: true,
      message: [],
      chart_data: { x_axis, y_axis },
      RecentSlaughters,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error. Please try again.',
      error: err.message,
    });
  }
};


exports.SuperAdminSlaughterHouseDataset = async (req, res) => {
  try {
  const RecentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
  // Extract animalId from RecentProducts
  const animalIds = RecentProducts.map(product => product.productid.split(':')[1]);
    // Retrieve corresponding animals from Animal model
    const RecentSlaughters = await Animal.find({ _id: { $in: animalIds } });

    const dateRange = req.query.dateRange || '1week';
const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
const endDate = moment().startOf('day');

const datesRange = [];
const currentDate = startDate.clone();
while (currentDate.isSameOrBefore(endDate)) {
  datesRange.push(currentDate.format('YYYY-MM-DD'));
  currentDate.add(1, 'day');
}

const productsInRange = await Product.aggregate([
  {
    $match: {
      createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
    }
  },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      date: "$_id",
      count: 1
    }
  }
]);

const productsInRangeWithMissingDays = datesRange.map(date => {
  const product = productsInRange.find(p => p.date === date);
  return {
    date,
    count: product ? product.count : 0
  };
});

const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
  (result, { date, count }) => {
    result.x_axis.push(date);
    result.y_axis.push(count);
    return result;
  },
  { x_axis: [], y_axis: [] }
);

return res.status(200).json({
  success: true,
  message: [],
  chart_data: { x_axis, y_axis },
  RecentSlaughters,
});
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error. Please try again.',
      error: err.message,
    });
  }
};


// TimeFrame Selection:
function getDateRangeOffset(dateRange) {
  switch (dateRange) {
    case '1week':
      return 7;
    case '1month':
      return 30;
    case '3months':
      return 90;
    case '6months':
      return 180;
    case '1year':
      return 365;
    default:
      return 7;
  }
}

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
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error try again",
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
        address: "Not Found",
        name: "Not Found",
        owner_name: "Not Found",
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

    let distributor = "";
    let DistributorStatus = true;
    try {
      distributor = await Distributor.findById(req.body?.DISTRIBUTORID);
    } catch {}
    if (!distributor) {
      DistributorStatus = false;
      distributor = {
        distributor_uuid: "Not Found",
        name: "Not Found",
      };
    }

    let retailor = null;
    let RetailorStatus = true;
    try {
      retailor = await Retailor.findById(req.body?.RETAILORID);
    } catch {}

    if (!retailor) {
      RetailorStatus = false;
      retailor = {
        retailor_uuid: "Not Found",
        name: "Not Found",
      };
    }

    const ProductReportResult = {
      farm,
      slaughter,
      butcher,
      animal,
      retailor,
      distributor,
    };
    const Status = {
      FarmStatus: FarmStatus,
      SlaughterStatus: SlaughterStatus,
      DistributorStatus: DistributorStatus,
      RetailorStatus: RetailorStatus,
    };

    const FilteredReport = filterReport(ProductReportResult);
    return res.status(200).json({
      success: true,
      message: Status,
      FilteredReport,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error try again",
      error: err,
    });
  }
};

function filterReport(response) {
  const filteredResponse = {
    FarmName: response.farm.farm_name,
    FarmAddress: response.farm.farm_address,
    AnimalTAG: response.animal.animal_uuid,
    AnimalDOB: response.animal.animal_dob,
    ArrivalTime: response.animal.createdAt,
    Breed: response.animal.breed_name,
    CattleWeight: response.animal.animal_weight,
    CattleGender: response.animal.animal_breedingStatus,
    Medication: response.animal.animal_medication,
    InjuryStatus: response.animal.animal_injuryStatus,
    HealthStatus: response.animal.animal_healthStatus,
    SlaughterName: response.slaughter.name,
    SlaughterAddress: response.slaughter.address,
    OwnerName: response.slaughter.owner_name,
    ButcherName: response.butcher.name,
    ButcherNIC: response.butcher.nic,
    DistributorReg: response.distributor.distributor_uuid,
    DistributorName: response.distributor.name,
    RetailorReg: response.retailor.retailor_uuid,
    RetailorName: response.retailor.name,
  };
  return filteredResponse;
}
