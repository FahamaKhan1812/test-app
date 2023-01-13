// models/user.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "farms",
  },
});

module.exports = mongoose.model("User", UserSchema);
