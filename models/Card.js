const mongoose = require('mongoose');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Door = require('./Door');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, "Please provide user id to which this card belongs to."]
  },
  door: {
    type: mongoose.Schema.ObjectId,
    ref: 'Door'
  },
  status: {
    type: String,
    enum: ['lost', 'not lost'],
    default: 'not lost',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Card = mongoose.model('Card', CardSchema);
