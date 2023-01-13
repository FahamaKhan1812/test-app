// models/farm.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AnimalSchema = new mongoose.Schema({
  animal_uuid: {
    type: String,
    default: uuidv4()
  },
  farm_id: {
    type: String,
    required: true
  },
  breed_name: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required:false
  },
  animal_dob: {
    type: String,
    required:true
  },
  
}, {timestamps: true});

module.exports = mongoose.model('animal', AnimalSchema);
