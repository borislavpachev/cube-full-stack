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
    trim: true,
    validate: {
      validator: function (phoneNum) {
        const phoneRegex =
          /^(\+?[1-9]\d{0,2}[-.\s]?)?(\(?0?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        return phoneRegex.test(phoneNum);
      },
      message: 'The mobile phone must be a real phone number',
    },
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
    street: { type: String },
    city: { type: String },
    additionalInfo: { type: String },
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
  isBlocked: {
    type: Boolean,
    default: false,
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
