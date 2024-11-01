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
    maxLength: 200,
  },
  price: {
    type: Number,
    min: 0,
  },
  frontCover: {
    type: String,
    default: '',
    required: [true, 'A product must have a front cover'],
  },
  backCover: {
    type: String,
    default: '',
    required: [true, 'A product must have a back cover'],
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
    XS: {
      type: Number,
      default: 0,
    },
    S: {
      type: Number,
      default: 0,
    },
    M: {
      type: Number,
      default: 0,
    },
    L: {
      type: Number,
      default: 0,
    },
    XL: {
      type: Number,
      default: 0,
    },
    XXL: {
      type: Number,
      default: 0,
    },
  },
  color: {
    type: String,
    required: [true, 'A product must have a color'],
    default: 'White',
  },
  gender: {
    type: String,
    enum: {
      values: ['Men', 'Women'],
      message: 'Products are either Men or Women',
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
