const express = require('express');
const { updatePaymentStatusHandler } = require('../controllers/paymentController.js');

const router = express.Router();

router.patch('/update', updatePaymentStatusHandler);

module.exports = router;
