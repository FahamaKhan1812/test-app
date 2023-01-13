const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const DistributorSchema = new mongoose.Schema({
distributor_uuid: {
    type: String,
    default: uuidv4()
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required:true
  },
    role: {
    type: String,
  },
  
}, {timestamps: true});

module.exports = mongoose.model('distributor', DistributorSchema);
