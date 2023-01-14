const express = require("express");
const mogoose = require("mongoose");
const { success, error } = require("consola");


//connect to mongodb server
const dbURI =
  "mongodb+srv://fahama:YviAIPJlQUwbmwW1@final-year-project.3wxb73f.mongodb.net/FYP";
const app = express();
app.use(express.json()); // this line is for parsing json body

// User Router Middleware
app.use("/api/users", require("./routes/user-routes"));

// Farm Handler Middleware
app.use("/api/farm", require("./routes/farm-routes"));

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
