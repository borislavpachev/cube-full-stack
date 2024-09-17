const rateLimit = require('express-rate-limit');
const oneHour = 60 * 60 * 1000;

module.exports = rateLimit({
  max: 1000,
  windowMs: oneHour,
  message: 'Too many request from the same IP, try again in an hour',
});
