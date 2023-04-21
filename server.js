require('colors');
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Initialize server
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/doors', require('./routes/api/doors'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cards', require('./routes/api/cards'));

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
