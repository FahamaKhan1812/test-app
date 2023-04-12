const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const FarmSchema = new mongoose.Schema({
  farm_uuid: {
    type: String,
    default: uuidv4()
  },
  farm_name: {
    type: String,
    required: true
  },
  farm_address: {
    type: String,
    required: true
  },
  farm_capacity: {
    type: Number
  }
 
  
}, {timestamps: true});

module.exports = mongoose.model('farm', FarmSchema);
