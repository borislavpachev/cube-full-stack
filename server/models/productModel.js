const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 40,
    required: [true, 'A product must have a name'],
  },
  description: {
    type: String,
    trim: true,
    minLength: 10,
  },
  price: {
    type: Number,
    min: 0,
  },
  images: {
    type: [String],
    required: [true, 'A product must have images'],
  },
  coverImages: {
    type: [String],
    required: [true, 'A product must have cover image'],
  },
  quantity: {
    extraSmall: {
      type: Number,
      default: 0,
    },
    small: {
      type: Number,
      default: 0,
    },
    medium: {
      type: Number,
      default: 0,
    },
    large: {
      type: Number,
      default: 0,
    },
    extraLarge: {
      type: Number,
      default: 0,
    },
    doubleExtraLarge: {
      type: Number,
      default: 0,
    },
  },
  color: {
    type: String,
    required: [true, 'A product must have a color'],
    default: 'white',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: ['Maths', 'Space', 'Nature', 'Art', 'Love', 'Technology'],
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
