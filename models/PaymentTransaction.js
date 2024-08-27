const mongoose = require('mongoose');

const PaymentTransactionSchema = new mongoose.Schema({
  transactionId: { 
    type: String, 
    unique: true, 
    required: true 
},
  amount: { 
    type: Number, 
    required: true 
},
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
},
  status: { 
    type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILURE'], 
    default: 'PENDING' 
},
});

module.exports = mongoose.model('PaymentTransaction', PaymentTransactionSchema);
