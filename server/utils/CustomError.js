const httpStatus = require('./httpStatus');

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

module.exports = CustomError;
