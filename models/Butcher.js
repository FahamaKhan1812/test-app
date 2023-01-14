// models/farm.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ButcherSchema = new mongoose.Schema({
  butcher_uuid: {
    type: String,
    default: uuidv4()
  },
  name: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  slaughterid: {
    type: String,
    required:true
  },
  
}, {timestamps: true});

module.exports = mongoose.model('butcher', ButcherSchema);
