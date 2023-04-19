const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');

const app = express();

// Connect to DB
connectDB();

// Init Middleware - extended: false limits it to prasing objects and arrays only
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/doors', require('./routes/api/doors'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
