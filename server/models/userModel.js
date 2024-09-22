const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'User must have a phone number'],
    validate: {
      validator: function (phoneNum) {
        return validator.isMobilePhone(phoneNum, 'any');
      },
      message: 'The mobile phone must be a real phone number',
    },
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],
  shoppingCart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],
  deliveryAddress: {
    type: String,
  },
  orders: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    default: [],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minLength: 8,
    select: false,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = 12;
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return bcrypt.compare(inputPassword, userPassword);
};

const User = model('User', userSchema);

module.exports = User;
