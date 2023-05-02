const express = require("express");
const router = express.Router();

const ProductInfoController = require('../controller/blockchain/product-dataController');
const BlockchainController = require('../controller/blockchain/BlockchainController');
router.get("/getproductbyid/:id", ProductInfoController.getDataFromBlockchain);

router.post("/CreateProductOnBlockchain",BlockchainController.createProduct);
router.get("/GetProductFromBlockchain/:id",BlockchainController.retrieveDataBlockchain);
module.exports = router;
