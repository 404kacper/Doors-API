const mongoose = require('mongoose');

const DoorSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  cards: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Card',
    validate: {
      validator: function(v) {
        return new Set(v).size === v.length;
      },
      message: props => `${props.value} must be unique.`
    }
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Door = mongoose.model('Door', DoorSchema);
