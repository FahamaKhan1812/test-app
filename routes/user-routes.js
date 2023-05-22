const router = require("express").Router();
const UserController = require("../controller/User");
// const sterilizeUserResponse = require('../utils/helper/sterilize.user.response');

// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  resetUserPassword,
} = require("../utils/Auth");

const User = require("../models/User");

// Login Route
router.post("/login", async (req, res) => {
  await userLogin(req.body, res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// farmowner Registration Route
router.post("/register-farmowner", async (req, res) => {
  await userRegister(req.body, "farmowner", res);
});

// get all User objects
// Superadmin protected
router.get(
  "/getallusers",
  userAuth,
  checkRole(["superadmin"]),
  UserController.get_all_users,
);

// Farm-users Registeration Route
router.post(
  "/register-farm-user",
  userAuth,
  checkRole(["farmowner"]), //this endpoint requires farmowner role only
  async (req, res) => {
    await userRegister(req.body, "farmuser", res);
  },
);

// Slaughter-House-owner Registration Route
router.post("/register-slaughter-house-owner", async (req, res) => {
  await userRegister(req.body, "slaughterhouseowner", res);
});

// Slaughter-House-user Registration Route
router.post("/register-slaughter-house-user", async (req, res) => {
  await userRegister(req.body, "slaughterhouseuser", res);
});
// Get User by their Ids
router.get(
  "/getuserbyid",
  userAuth,
  checkRole(["superadmin","farmowner", "slaughterhouseowner", "retailer", "distributor"]),
  UserController.getUserById,
);

// Update User 
router.put(
  '/updateuser',
  userAuth,
  checkRole(["superadmin","farmowner", "slaughterhouseowner", "retailer", "distributor"]),
  UserController.updateUserById
)

// Reset password
router.post("/restpassword", resetUserPassword);
module.exports = router;
