const express = require("express");
// const morgan = require('morgan');
const mogoonse = require("mongoose");

//Routes
const superAdminRoutes = require("./routes/super-admin-routes");
const FarmRoutes=require("./routes/farm-routes");
const AnimalRoutes=require("./routes/animal-routes.js")
const SlaughterHouseRoutes=require("./routes/slaughter-house-routes.js");
const DistributorRoutes=require("./routes/distributor-routes");
const RetailorRoutes=require("./routes/retailor-routes.js")


const UserRoutes=require("./routes/user-routes");

//connect to mongodb server
const dbURI = "mongodb+srv://fahama:YviAIPJlQUwbmwW1@final-year-project.3wxb73f.mongodb.net/FYP"
 const app = express();

// For Super Admin
app.use(express.json()); // this line is for parsing json body
app.use('/createnewadmin', superAdminRoutes);


app.use('/createfarm', FarmRoutes);
app.use('/getfarms', FarmRoutes);

app.use('/createanimal', AnimalRoutes);
app.use('/getanimals', AnimalRoutes);

app.use('/createdistributor', DistributorRoutes);
app.use('/getdistributors', DistributorRoutes);

app.use('/createretailor', RetailorRoutes);
app.use('/getretailors', RetailorRoutes);

app.use('/createslaughterhouse', SlaughterHouseRoutes);
app.use('/getslaughterhouses', SlaughterHouseRoutes);

app.use('/createuser', UserRoutes)



mogoonse
  .connect(dbURI)
  .then(() => {
    app.listen(5000, () => console.log("Connected!!"));
  })
  .catch((err) => console.log(err)) ;
