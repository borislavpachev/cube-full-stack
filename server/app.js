const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('./middleware/rateLimiter');
dotenv.config({ path: './config.env' });

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', rateLimit);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
