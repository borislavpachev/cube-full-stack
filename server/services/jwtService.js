const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

exports.signToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    return new AppError(error.message, error.code);
  }
};

exports.verifyToken = (token, secret, next) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return next(new AppError('Access denied', 403));
  }
};
