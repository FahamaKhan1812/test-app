const express = require("express");
const router = express.Router();

const FarmController = require("../controller/FarmController");
const { userAuth, checkRole } = require("../utils/Auth");

router.post(
  "/createnewfarm",
  userAuth,
  checkRole(["superadmin"]), //Only super admins can access this endpoint
  FarmController.create_farm
);

router.get(
  "/getallfarms",
  userAuth,
  checkRole(["superadmin"]),
  FarmController.get_farms
);
router.get(
  "/getfarmbyid/:id",
  userAuth,
  checkRole(["superadmin", "farmowner", "farmuser"]),
  FarmController.getFarmById
);
router.get(
  "/getallanimalbyfarmid/:id",
  userAuth,
  checkRole(["superadmin", "farmowner", "farmuser"]),
  FarmController.getAnimalByFarm_uuid
);

module.exports = router;
