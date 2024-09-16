const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

dotenv.config({ path: './config.env' });

const app = express();
connectDB();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
