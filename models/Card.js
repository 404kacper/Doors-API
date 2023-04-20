const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  permissions: {
    type: [String],
    default: ["-1"]
  },
  status: {
    type: String,
    enum: ["lost", "not lost"],
    default: "not lost"
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Card = mongoose.model('Card', CardSchema);