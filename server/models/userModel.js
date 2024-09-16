const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
    trim: true,
    minLength: 1,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
    trim: true,
    minLength: 1,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'The email is not a valid email'],
  },
  role: {
    type: String,
    enum: {
      values: ['User', 'Admin'],
      message: 'The user roles are: User or Admin',
    },
    default: 'User',
  },
  phoneNumber: {
    type: String,
  },
  favorites: {
    type: Array,
    default: [],
  },
  shoppingCart: {
    type: Array,
    default: [],
  },
  deliveryAddress: {
    type: String,
  },
  orders: {
    type: Array,
    default: [],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password to continue'],
    validate: {
      // works only on CREATE and SAVE
      validator: function (passConfirm) {
        return passConfirm === this.password;
      },
      message: 'The password confirm should match password',
    },
  },
});

const User = model('User', userSchema);

module.exports = User;
