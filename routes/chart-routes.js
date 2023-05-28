const express = require("express");
const router = express.Router();
// Controller
const DistributorChart = require("../controller/charts/distributor-chart");
const RetailorChart = require("../controller/charts/retailor-chart");
const SlaughterHouseChart = require("../controller/charts/slaughter-house-chart");
const FarmChart = require("../controller/charts/farm-chart");
const SuperAdminChart = require("../controller/charts/superadmin-chart");

const { userAuth, checkRole } = require("../utils/Auth");

// Slaughterhouse Chart Routes
router.get(
  "/getslaughterhousedataset/:slaughterhouseID",
  userAuth,
  checkRole(["superadmin", "slaughterhouseowner", "slaughterhouseuser"]),
  SlaughterHouseChart.SlaughterHouseDataset,
);

// Retailor Chart Routes
router.get(
  "/getretailordataset/:retailorID",
  userAuth,
  checkRole(["superadmin", "distributor"]),
  RetailorChart.retailorDataset,
);

// Distributor Chart Routes
router.get(
  "/getdistributordataset/:distributorID",
  userAuth,
  checkRole(["superadmin", "distributor"]),
  DistributorChart.distributorDataset,
);

// Farm Chart Routes
router.get(
  "/getfarmdataset/:farmID",
  userAuth,
  checkRole(["superadmin", "farmowner", "farmuser"]),
  FarmChart.farmDataset,
);

// Superadmin Routes
router.get("/allfarmdataset", SuperAdminChart.SuperAdminFarmDataset);

router.get(
  "/alldistributorsdataset",
  userAuth,
  checkRole(["superadmin"]),
  SuperAdminChart.SuperAdmindistributorDataset,
);

router.get(
  "/allretailorsdataset",
  userAuth,
  checkRole(["superadmin"]),
  SuperAdminChart.SuperAdminRetailerDataset,
);

router.get(
  "/allslaughterhousedataset",
  userAuth,
  checkRole(["superadmin"]),
  SuperAdminChart.SuperAdminSlaughterHouseDataset,
);

module.exports = router;
