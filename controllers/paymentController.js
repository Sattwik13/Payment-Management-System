const { updatePaymentStatus } = require('../services/paymentService');

const updatePaymentStatusHandler = async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    await updatePaymentStatus(transactionId, status);
    res.json({ message: 'Payment status updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { updatePaymentStatusHandler };
