const rateLimit = require('express-rate-limit');
const oneHourLimit = 60 * 60 * 1000;

module.exports = rateLimit({
  max: 2000,
  windowMs: oneHourLimit,
  message: 'Too many request from the same IP, try again in an hour',
});
