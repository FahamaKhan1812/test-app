const express = require("express");
const router = express.Router();

const ProductInfoController = require('../controller/blockchain/product-dataController');

router.get("/getproductbyid/:id", ProductInfoController.getDataFromBlockchain);

module.exports = router;
