const Order = require('../models/Order.js');
const { createOrUpdateCustomer, findCustomerByPhoneNumber } = require('./customerService.js');
const { createTransaction } = require('./paymentService.js');
const { v4: uuidv4 } = require('uuid');
const Customer = require('../models/Customer.js');

const createOrder = async (customerData, amount) => {
  const customer = await createOrUpdateCustomer(customerData);
  const orderId = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);

  const order = new Order({
    orderId,
    customerId: customer._id,
    status: 'PENDING',
  });

  await order.save();

  await createTransaction(order._id, amount);

  return order;
};


const getOrdersByCustomerPhone = async (phoneNumber) => {
  try {
    const customer = await findCustomerByPhoneNumber(phoneNumber);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return await Order.find({ customerId: customer._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createOrder, getOrdersByCustomerPhone };
