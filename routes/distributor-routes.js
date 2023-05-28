const express = require("express");
const router = express.Router();
const DistributorController = require("../controller/DistributorController");
const { userAuth, checkRole } = require("../utils/Auth");
router.post(
  "/createnewdistributor",
  userAuth,
  checkRole(["superadmin"]),
  DistributorController.create_distributor,
);
router.get(
  "/getalldistributors",
  userAuth,
  checkRole(["superadmin"]),
  DistributorController.get_distributors,
);

router.get("/getdistributorbyid:id", DistributorController.getdistributorById);

module.exports = router;
