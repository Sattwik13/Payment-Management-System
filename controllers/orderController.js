const { createOrder, getOrdersByCustomerPhone } = require('../services/orderService');

const createOrderHandler = async (req, res) => {
  try {
    const { customer, amount } = req.body;
    if (!customer || !customer.name) {
      return res.status(401).json({ message: 'Customer name is missing' });
    }

    
    const order = await createOrder(customer, amount);
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOrdersHandler = async (req, res) => {

    // console.log('getOrdersHandler called with req:', req);
    // console.log('getOrdersHandler called with res:', res);
    
  try {
    const { phoneNumber } = req.query; // 1st error-> .phoneNumber is missing
    console.log(phoneNumber);
    
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const orders = await getOrdersByCustomerPhone(phoneNumber);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

module.exports = { createOrderHandler, getOrdersHandler };
