const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(morgan('dev'));

// allows to use req.body
app.use(express.json());

module.exports = app;
