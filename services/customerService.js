const Customer = require('../models/Customer.js');
const { encrypt } = require('../utils/encryption.js');

const createOrUpdateCustomer = async (customerData) => {
  
  const existingCustomer = await Customer.findOne({ phoneNumber: customerData.phoneNumber });
  if (existingCustomer) {
    throw new Error('Customer with this phone number already exists');
  }
  // const CustomerData = JSON.stringify(customerData);
  const encryptedData = encrypt(JSON.stringify(customerData));
  const customer = new Customer({
    ...customerData, // ---The spread operator (...) is used to copy all properties from the customerData object into the new object that is being passed to the Customer constructor.
    encryptedData,
  });
  return await customer.save();
};

const findCustomerByPhoneNumber = async (phoneNumber) => {
  return await Customer.findOne({ phoneNumber });
};

module.exports = { createOrUpdateCustomer, findCustomerByPhoneNumber };
