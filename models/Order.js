const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
     type: String,
     unique: true, 
     required: true 
    },
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', 
    required: true 
},
  status: { type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILURE'], 
    default: 'PENDING' 
},
});

module.exports = mongoose.model('Order', OrderSchema);
