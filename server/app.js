const express = require('express');
const CustomError = require('./utils/CustomError');
const httpStatus = require('./utils/httpStatus');
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
  const error = new CustomError(
    `Can't find ${req.originalUrl} on this server!`,
    httpStatus.NOT_FOUND
  );

  next(error);
});

app.use(errorHandler);

module.exports = app;
