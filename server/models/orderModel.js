const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({});

const Order = model('Order', orderSchema);

module.exports = Order;
