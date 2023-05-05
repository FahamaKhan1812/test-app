const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

router.post('/createnewproduct', ProductController.create_Product);
router.get('/getallproducts', ProductController.get_products);
router.get('/getproductbyid:id', ProductController.getproductById);

router.get('/getproductbyretailorid/:retailorID', ProductController.productbyretailor);

router.get('/getproductbydistributorid/:distributorID', ProductController.productbydistributor);

router.put("/updateproductdistributor/:id",ProductController.updateproductdistributorById);
router.put("/updateproductretailor/:id",ProductController.updateproductretailorById);

router.post("/ProductReport/",ProductController.ProductReport); // For Mobile Application
module.exports = router;
