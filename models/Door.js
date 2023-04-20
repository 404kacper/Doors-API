const mongoose = require('mongoose');

const DoorSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  cards: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Card',
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Door = mongoose.model('Door', DoorSchema);
