const express = require("express");
const router = express.Router();
const AnimalController = require("../controller/AnimalController");

const { userAuth, checkRole } = require("../utils/Auth");

//This route is only accessible to the farmowner & farmuser
router.post(
  "/addnewanimal",
  userAuth,
  checkRole(["farmowner", "farmuser"]),
  AnimalController.create_animal,
);
router.get("/getallanimals", AnimalController.get_animals);
router.get("/getanimalbyfarmid/", AnimalController.getanimalById);

router.get("/AnimalDatasetfarm/:farmID",AnimalController.AnimalDatasetbyfarmID);
router.get("/FarmDataset",AnimalController.FarmDatasetSuperAdmin);

// update animal by Id
router.put(
  "/updateanimal/:id",
  userAuth,
  checkRole(["slaughterhouseowner", "slaughterhouseuser"]),
  AnimalController.updateAnimalById,
);

module.exports = router;
