const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');

exports.signToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    return new CustomError(error.message, error.code);
  }
};

exports.verifyToken = (token, secret, next) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return next(new CustomError('Access denied', httpStatus.FORBIDDEN));
  }
};
