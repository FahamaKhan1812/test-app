const router = require("express").Router();
// Bring in the User Registration function
const { userLogin, userRegister } = require("../utils/Auth");

// Users Registeration Route
// Use this route for multiple users e.g slaughterhouseowners, distributer and retailer.
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});
// farmowner Registration Route
router.post("/register-farmowner", async (req, res) => {
  await userRegister(req.body, "farmowner", res);
});

// Other types of User Login Route
// Currently this endpoint is not working properly
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-farmowner", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
// router.get("/profile", userAuth, async (req, res) => {
//   return res.json(serializeUser(req.user));
// });

// Users Protected Route
// router.get(
//   "/user-protectd",
//   userAuth,
//   checkRole(["user"]),
//   async (req, res) => {
//     return res.json("Hello User");
//   }
// );

// Admin Protected Route
// router.get(
//   "/admin-protectd",
//   userAuth,
//   checkRole(["admin"]),
//   async (req, res) => {
//     return res.json("Hello Admin");
//   }
// );

// Super Admin Protected Route
// router.get(
//   "/super-admin-protectd",
//   userAuth,
//   checkRole(["superadmin"]),
//   async (req, res) => {
//     return res.json("Hello Super Admin");
//   }
// );

// Super Admin Protected Route
// router.get(
//   "/super-admin-and-admin-protectd",
//   userAuth,
//   checkRole(["superadmin", "admin"]),
//   async (req, res) => {
//     return res.json("Super admin and Admin");
//   }
// );

module.exports = router;
