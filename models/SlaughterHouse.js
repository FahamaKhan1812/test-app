// models/farm.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const SlaughterHouseSchema = new mongoose.Schema(
  {
    slaughterhouse_uuid: {
      type: String,
      default: uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    farm_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("slaughterhouse", SlaughterHouseSchema);
