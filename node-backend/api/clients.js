const express = require('express');

const Client = require('../models/client');
const Note = require('../models/note');

const router = express.Router();

// get all clients
router.get('/all', (req, res) => {
  const { filterBy, sortBy, sortOrder } = req.query;
  const filterConditions = {};
  if (filterBy !== 'all') {
    filterConditions.status = filterBy;
  }
  const sortConditions = { [sortBy]: sortOrder };
  Client.find(filterConditions)
    .sort(sortConditions)
    .exec((err, clients) => {
      err ? res.status(400).send(err) : res.json(clients);
    });
});

// get specific client
router.get('/:id', (req, res) => {
  Client.findById(req.params.id)
    .populate('notes')
    .exec((err, client) => res.json(err ? err : client));
});

// add client
router.post('/add', (req, res) => {
  Client.create(req.body).then(newClient =>
    newClient
      .save()
      .then(item => res.json(item))
      .catch(err => res.status(400).send(err))
  );
});

// removes client
router.delete('/delete', (req, res) => {
  Client.findByIdAndRemove({ _id: req.body.id }).exec((err, item) => {
    console.info(item.notes);
    Note.deleteMany({ _id: { $in: item.notes } }, err => {
      if (err) {
        res.status(400).send(err);
      }
    });
    return err ? res.status(400).send(err) : res.json('Deleted');
  });
});

// update client
router.post('/update/:id', (req, res) => {
  Client.findByIdAndUpdate(req.params.id, req.body).exec(
    (err, item) => (err ? res.status(400).send(err) : res.json('Updated'))
  );
});

module.exports = router;
