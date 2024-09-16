const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'An order must have a user'],
  },
  products: {
    type: Array,
    default: [],
  },
  totalPrice: {
    type: Number,
  },
  createdAt: Date,
  status: {
    type: String,
    enum: {
      values: ['In Progress', 'Shipped'],
      message: 'Order status is either: In Progress or Shipped',
    },
  },
});

const Order = model('Order', orderSchema);

module.exports = Order;
