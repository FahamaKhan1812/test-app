const express = require("express");
const router = express.Router();
const ButcherController = require("../controller/ButcherController");
const { userAuth, checkRole } = require("../utils/Auth");

router.post(
  "/createnewbutcher",
  userAuth,
  checkRole(["slaughterhouseowner"]),
  ButcherController.create_butcher,
);

router.get("/getallbutchers", ButcherController.get_butchers);

router.get(
  "/getbutcherbyid",
  userAuth,
  checkRole(["slaughterhouseowner", "slaughterhouseuser"]),
  ButcherController.getbutcherById,
);

module.exports = router;
