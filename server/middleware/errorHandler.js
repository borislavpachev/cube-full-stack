/* eslint-disable no-unused-vars */
const httpStatus = require('../utils/httpStatus');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
