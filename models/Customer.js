const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true
     },
  phoneNumber: {
     type: String, 
     required: true, 
     unique: true
     },
  email: { 
    type: String
     },
  encryptedData: {
     type: String, 
     required: true 
    },
});

module.exports = mongoose.model('Customer', CustomerSchema);
