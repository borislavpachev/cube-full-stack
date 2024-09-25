const mongoose = require('mongoose');
const CustomError = require('./CustomError');
const httpStatus = require('./httpStatus');

module.exports = async (_id, next) => {
  if (!mongoose.isValidObjectId(_id)) {
    return next(new CustomError('Invalid MongoDB ID', httpStatus.BAD_REQUEST));
  }
  
  return _id;
};
