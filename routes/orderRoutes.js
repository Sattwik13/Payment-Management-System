const express = require('express');
const { createOrderHandler, getOrdersHandler } = require('../controllers/orderController.js');

const router = express.Router();

router.post('/create', createOrderHandler);
router.get('/customer', getOrdersHandler);

module.exports = router;
