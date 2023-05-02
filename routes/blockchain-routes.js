const express = require("express");
const router = express.Router();

const BlockchainController = require('../controller/blockchain/BlockchainController');

router.post("/CreateProductOnBlockchain",BlockchainController.createProduct);
router.get("/GetProductFromBlockchain/:id",BlockchainController.retrieveDataBlockchain);
router.put("/UpdateDistributor",BlockchainController.updatedistributorinBlockchain);
router.put("/UpdateRetailor",BlockchainController.updateretailorinBlockchain);


module.exports = router;
