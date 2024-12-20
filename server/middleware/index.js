const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const rateLimit = require('./rateLimiter');

module.exports = (app) => {
  app.use(
    cors({
      origin: 'https://cube-full-stack.vercel.app',
      credentials: true,
    })
  );
  app.options('*', cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(mongoSanitize());
  app.use(cookieParser());
  app.use('/api', rateLimit);
};
