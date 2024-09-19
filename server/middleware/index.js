const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const rateLimit = require('./rateLimiter');

module.exports = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(mongoSanitize());
  app.use('/api', rateLimit);
};
