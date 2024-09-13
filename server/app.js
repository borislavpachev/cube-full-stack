const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
