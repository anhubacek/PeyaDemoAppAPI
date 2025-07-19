const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  hasDrink: Boolean,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  products: [CartItemSchema],
  total: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
