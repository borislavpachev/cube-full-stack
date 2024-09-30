const oneDayInMs = 24 * 60 * 60 * 1000;
module.exports = new Date(
  Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * oneDayInMs
);
