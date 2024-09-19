const express = require('express');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');
const middlewares = require('./middleware/index');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
middlewares(app);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );

  next(error);
});

app.use(errorHandler);

module.exports = app;
