// models/farm.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AnimalSchema = new mongoose.Schema(
  {
    animal_uuid: {
      type: String,
      default: uuidv4(),
    },
    breed_name: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      // required: true,
    },
    animal_dob: {
      type: String,
      required: true,
    },
    farm_Id: {
      type: String,
    },
    user_Id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("animal", AnimalSchema);
