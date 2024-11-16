const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An order must have a user'],
  },
  products: {
    type: Array,
    default: [],
  },
  totalPrice: {
    type: Number,
    required: [true, 'An order must have a total price'],
    default: 0,
  },
  createdAt: Date,
  status: {
    type: String,
    default: 'In Progress',
    enum: {
      values: ['In Progress', 'Delivered'],
      message: 'Order status is either: In Progress or Shipped',
    },
  },
});

const Order = model('Order', orderSchema);

module.exports = Order;
