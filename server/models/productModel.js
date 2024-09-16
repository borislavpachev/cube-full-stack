const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 40,
    unique: true,
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
  gallery: {
    type: [String],
    required: [true, 'A product must have images'],
    default: [],
  },
  sizes: {
    type: [String],
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      message: 'The product sizes are: XS, S, M, L, XL or XXL',
    },
    default: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
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
    enum: {
      values: ['Male', 'Female'],
      message: 'Products are either Male or Female',
    },
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: {
      values: ['Maths', 'Space', 'Nature', 'Art', 'Love', 'Technology'],
      message: `Product category must be one of the following:
      Maths, Space, Nature, Art, Love or Technology`,
    },
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
