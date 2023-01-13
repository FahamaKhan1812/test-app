const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const SuperAdminSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "super_admin",
  },
});

module.exports = mongoose.model("super", SuperAdminSchema);
