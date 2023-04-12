const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
} = require("../utils/Auth");

const User = require("../models/User");

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// farmowner Registration Route
router.post("/register-farmowner", async (req, res) => {
  await userRegister(req.body, "farmowner", res);
});

// Farmowner Login Route
router.post("/login-farmowner", async (req, res) => {
  await userLogin(req.body, "farmowner", res);
});

// Testing endpoint
// Profile Route
router.get(
  "/profile",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    // console.log(req);
    return res.json("Hello");
  }
);

// get all User objects
// Superadmin protected
router.get(
  "/getallusers",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json({
        success: true,
        message: [],
        user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
);

// Farm-users Registeration Route
router.post(
  "/register-farm-user",
  userAuth,
  checkRole(["farmowner"]), //this endpoint requires farmowner role only
  async (req, res) => {
    await userRegister(req.body, "farmuser", res);
  }
);

//Login as a new farm user
router.post("/login-farmuser", async (req, res) => {
  await userLogin(req.body, "farmuser", res);
});

// Slaughter-House-owner Registration Route
router.post("/register-slaughter-house-owner ", async (req, res) => {
  await userRegister(req.body, "slaughterhouseowner", res);
});

// Slaughter-House-owner Login Route
router.post("/login-slaughter-house-owner", async (req, res) => {
  await userLogin(req.body, "slaughterhouseowner", res);
});


module.exports = router;
