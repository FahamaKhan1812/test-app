const express = require("express");
const mogoose = require("mongoose");
const { success, error } = require("consola");

//Routes
const superAdminRoutes = require("./routes/super-admin-routes");
const FarmRoutes = require("./routes/farm-routes");
const AnimalRoutes = require("./routes/animal-routes.js");
const SlaughterHouseRoutes = require("./routes/slaughter-house-routes.js");
const DistributorRoutes = require("./routes/distributor-routes");
const RetailorRoutes = require("./routes/retailor-routes.js");
const ButcherRoutes = require("./routes/butcher-routes.js");
const ProductRoutes = require("./routes/product-routes.js");

const UserRoutes = require("./routes/user-routes");

//connect to mongodb server
const dbURI =
  "mongodb+srv://fahama:YviAIPJlQUwbmwW1@final-year-project.3wxb73f.mongodb.net/FYP";
const app = express();
app.use(express.json()); // this line is for parsing json body

// User Router Middleware
app.use("/api/users", require("./routes/user-routes"));

// Farm Handler Middleware
app.use("/api/farm", require("./routes/farm-routes"));

app.use("/createanimal", AnimalRoutes);
app.use("/getanimals", AnimalRoutes);
app.use("/getanimalid", AnimalRoutes);

app.use("/createdistributor", DistributorRoutes);
app.use("/getdistributors", DistributorRoutes);
app.use("/getdistributorid", DistributorRoutes);

app.use("/createretailor", RetailorRoutes);
app.use("/getretailors", RetailorRoutes);
app.use("/getretailorid", RetailorRoutes);

app.use("/createslaughterhouse", SlaughterHouseRoutes);
app.use("/getslaughterhouses", SlaughterHouseRoutes);
app.use("/getslaughterhouseid", SlaughterHouseRoutes);

app.use("/createbutcher", ButcherRoutes);
app.use("/getbutchers", ButcherRoutes);
app.use("/getbutcherid", ButcherRoutes);

app.use("/createproduct", ProductRoutes);
app.use("/getproducts", ProductRoutes);
app.use("/getproductid", ProductRoutes);
app.use("/updateproductid", ProductRoutes);

// This will fire whenever an unknown endpoint is hit
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.send({ error: "404 Not Found" });
  }
});

startApp = async () => {
  try {
    mogoose.set("strictQuery", false);
    await mogoose.connect(dbURI);

    success({
      message: "Connected to the database successfully",
      badge: true,
    });

    app.listen(5000, () => {
      success({
        message: "Server is started at PORT: 5000",
      });
    });
  } catch (err) {
    error({
      message: `Unable to connect with database: ${err.message}`,
      badge: true,
    });
    startApp();
  }
};

// This will fire whenever an unknown endpoint is hit
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.send({ error: "404 Not Found" });
  }
});
startApp();
