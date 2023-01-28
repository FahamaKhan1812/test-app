// models/user.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    farm_Id: {
      type: String,
    },
    slaughter_house_Id: {
      type: String,
    },
    role: {
      type: String,
      enum: [
        "superadmin",
        "farmowner",
        "farmuser",
        "slaughterhouseowner",
        "slaughterhouseuser",
        "retailer",
        "distributor",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
