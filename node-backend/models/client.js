const mongoose = require('mongoose');

const { Schema } = mongoose;

const Client = new Schema({
  createdAt: { type: Date, default: Date.now },
  details: String,
  name: String,
  status: {
    type: String,
    enum: ['prospective', 'current', 'non-active'],
    defult: 'non-active'
  }
});

module.exports = mongoose.model('Client', Client);
