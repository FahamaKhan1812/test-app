const express = require('express');
const router = express.Router();

const PdfController = require('../controller/PdfController');
router.post('/pdf',PdfController.generatePdf);

module.exports = router;