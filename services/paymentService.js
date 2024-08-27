const PaymentTransaction = require('../models/PaymentTransaction.js');
const Order = require('../models/Order.js');
const { v4: uuidv4 } = require('uuid');

const createTransaction = async (orderId, amount) => {
  const transaction = new PaymentTransaction({
    transactionId: uuidv4().replace(/-/g, ''),
    amount,
    orderId,
    status: 'PENDING',
  });
  return await transaction.save();
};

const updatePaymentStatus = async (transactionId, status) => {
  const transaction = await PaymentTransaction.findOne({ transactionId });
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  if (transaction.status === 'FAILURE') {
    throw new Error('Failed transactions cannot be updated to success');
  }

  transaction.status = status;
  await transaction.save();

  const order = await Order.findById(transaction.orderId);
  order.status = status;
  await order.save();
};

module.exports = { createTransaction, updatePaymentStatus };
