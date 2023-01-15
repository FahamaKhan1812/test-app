const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

router.post('/', ProductController.create_Product);


router.get('/', ProductController.get_products);

router.get('/:id', ProductController.getproductById);

router.put("/:id",ProductController.updateproductById);

module.exports = router;
