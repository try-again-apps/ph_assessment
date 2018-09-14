const express = require('express');

const Client = require('../models/client');
const Note = require('../models/note');

const router = express.Router();

// get all notes - just for debug
router.get('/all', (req, res) => {
  Note.find().exec((err, notes) => {
    err ? res.status(400).send(err) : res.json(notes);
  });
});

// get specific note
router.get('/:id', (req, res) => {
  Note.findById(req.params.id).exec((err, note) => res.json(err ? err : note));
});

// add note to client
router.post('/add/:id', (req, res) => {
  const note = new Note(req.body);
  note.save().then(newNote => {
    Client.findById(req.params.id)
      .then(client => {
        client.notes.push(newNote);
        client.save();
        return res.json(newNote);
      })
      .catch(err => res.status(400).send(err));
  });
});

// remove note
router.delete('/delete', (req, res) => {
  Note.findByIdAndRemove({ _id: req.body.id })
    .populate('client')
    .exec((err, note) => {
      // remove reference
      Client.findById(note.client.id).then(client => {
        const noteIdx = client.notes.indexOf(note._id);
        client.notes.splice(noteIdx, 1);
        client.save();
      });
      return err ? res.status(400).send(err) : res.json('Deleted');
    });
});

// update note
router.post('/update/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body).exec(
    (err, item) => (err ? res.status(400).send(err) : res.json('Updated'))
  );
});

module.exports = router;
