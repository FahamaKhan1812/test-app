const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ProductSchema = new mongoose.Schema({
  animal_id: {
    type: String,
    required: true
  },
  butcher_id: {
    type: String,
    required: true
  },
  expirydate: {
    type: String,
    required:true
  },
  slaughterdate: {
    type: String,
    required:true
  },
  productid: {
    type: String,
    required:true
  },
  distributor:{
    type:String,
  },
  retailor:{
    type:String,
  }

  
}, {timestamps: true});

module.exports = mongoose.model('product', ProductSchema);
