const express = require('express');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');
const middlewares = require('./middleware/index');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

const app = express();
middlewares(app);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );

  next(error);
});

app.use(errorHandler);

module.exports = app;
