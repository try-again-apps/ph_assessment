const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  content: String,
  client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
