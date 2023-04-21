const express = require("express");
const mogoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const { success, error } = require("consola");
//connect to mongodb server
const dbURI =
  "mongodb+srv://fahama:YviAIPJlQUwbmwW1@final-year-project.3wxb73f.mongodb.net/FYP";
const app = express();
app.use(express.json()); // this line is for parsing json body
app.use(cors());


// for product info from the blockchain:
app.use("/api/get-product-info-from-blockchain", require("./routes/product-info-from-blockchain-routes"));

app.use(passport.initialize());
require("./middleware/passport")(passport);
// User Router Middleware
app.use("/api/user", require("./routes/user-routes"));

// Farm Handler Middleware
app.use("/api/farm", require("./routes/farm-routes"));

// Animal Handler Middleware
app.use("/api/animal", require("./routes/animal-routes"));

// Distributor Handler Middleware
app.use("/api/distributor", require("./routes/distributor-routes"));

// Slaughter House Handler Middleware
app.use("/api/slaughterhouse", require("./routes/slaughter-house-routes"));

// Retailor Handler Middleware
app.use("/api/retailor", require("./routes/retailor-routes"));

// Butcher Handler Middleware
app.use("/api/butcher", require("./routes/butcher-routes"));

app.use("/api/product", require("./routes/product-routes"));

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

startApp();
