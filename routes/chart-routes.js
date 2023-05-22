
const express = require('express');
const router = express.Router();
const DistributorChart =require('../controller/charts/distributor-chart');
const RetailorChart =require('../controller/charts/retailor-chart');
const SlaughterHouseChart =require('../controller/charts/slaughter-house-chart');
const FarmChart =require('../controller/charts/farm-chart');
const SuperAdminChart =require('../controller/charts/superadmin-chart');


router.get('/getslaughterhousedataset/:slaughterhouseID', SlaughterHouseChart.SlaughterHouseDataset);
router.get('/allslaughterhousedataset', SuperAdminChart.SuperAdminSlaughterHouseDataset);

router.get('/getretailordataset/:retailorID',RetailorChart.retailorDataset);
router.get('/allretailorsdataset',SuperAdminChart.SuperAdminRetailerDataset);

router.get('/getdistributordataset/:distributorID', DistributorChart.distributorDataset);
router.get('/alldistributorsdataset', SuperAdminChart.SuperAdmindistributorDataset);

router.get("/getfarmdataset/:farmID",FarmChart.farmDataset);
router.get("/allfarmdataset",SuperAdminChart.SuperAdminFarmDataset);

module.exports = router;
