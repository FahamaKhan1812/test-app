const express = require("express");
const router = express.Router();

const FarmController = require("../controller/FarmController");
const { userAuth, checkRole } = require("../utils/Auth");

router.post("/createnewfarm", FarmController.create_farm);
router.get(
  "/getallfarms",
  userAuth,
  checkRole(["superadmin", "farmowner"]),
  FarmController.get_farms
);
router.get("/getfarmbyid:id", FarmController.getFarmById);
router.get("/gettesting", FarmController.getAnimalByFarm_uuid);

module.exports = router;
