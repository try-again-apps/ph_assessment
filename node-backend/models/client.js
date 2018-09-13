const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  details: String,
  name: String,
  status: {
    type: String,
    enum: ['prospective', 'current', 'non-active'],
    defult: 'non-active'
  },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
});

const noteSchema = new Schema({
  content: String,
  client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

const Client = mongoose.model('Client', clientSchema);
const Note = mongoose.model('Note', noteSchema);

module.exports = {
  Client,
  Note
};
