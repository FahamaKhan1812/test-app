const express = require("express");
const router = express.Router();

const SlaughterHouseController = require("../controller/SlaughterHouseController");
const { userAuth, checkRole } = require("../utils/Auth");

router.post(
  "/createnewslaughterhouse",
  userAuth,
  checkRole(["superadmin", "farmowner"]),
  SlaughterHouseController.create_slaughterhouse
);
router.get(
  "/getallslaughterhouses",
  SlaughterHouseController.get_slaughterhouses
);
router.get(
  "/getslaughterhousebyid:id",
  SlaughterHouseController.getSlaughterhouseById
);
router.get(
  "/getbutcherbyslaughterhouse/:id",
  SlaughterHouseController.getButchersBySlaughterHouse_uuid
);

module.exports = router;
