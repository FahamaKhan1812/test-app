const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

router.post('/createnewproduct', ProductController.create_Product);
router.get('/getallproducts', ProductController.get_products);
router.get('/getproductbyid:id', ProductController.getproductById);
router.put("/updateproduct:id",ProductController.updateproductById);
router.get("/getProductReport/:id",ProductController.getproductReportById)
router.post("/ProductReport/",ProductController.ProductReport) // For Mobile Application
module.exports = router;
