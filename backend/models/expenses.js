const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Other']
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
 }, {
  timestamps: true
});

expenseSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Expense', expenseSchema);