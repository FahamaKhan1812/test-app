const express = require('express');
const router = express.Router();

const PdfController = require('../controller/PdfController');
router.post('/pdf',PdfController.generatePdf);
router.get('/hello',(req,res)=>{res.json("hello")})

module.exports = router;