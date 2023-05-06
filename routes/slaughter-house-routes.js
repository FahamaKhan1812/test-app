const express = require("express");
const router = express.Router();

const SlaughterHouseController = require("../controller/SlaughterHouseController");
const { userAuth, checkRole } = require("../utils/Auth");

router.post(
  "/createnewslaughterhouse",
  userAuth,
  checkRole(["superadmin", "farmowner"]),
  SlaughterHouseController.create_slaughterhouse,
);
router.get(
  "/getallslaughterhouses",
  userAuth,
  checkRole(["superadmin"]),
  SlaughterHouseController.get_slaughterhouses,
);
router.get(
  "/getslaughterhousebyid:id",
  userAuth,
  checkRole(["slaughterhouseowner", "slaughterhouseuser", "farmowner"]),
  SlaughterHouseController.getSlaughterhouseById,
);

// Currently not in use
router.get(
  "/getbutcherbyslaughterhouse/:id",
  SlaughterHouseController.getButchersBySlaughterHouse_uuid,
);
router.get(
  "/getslaughterdetailsbyfarmid",
  userAuth,
  checkRole(["farmowner", "slaughterhouseowner"]),
  SlaughterHouseController.getSlaughterHouseByFarmId,
);

module.exports = router;
