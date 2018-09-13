const express = require('express');

const { Client, Note } = require('./models/client');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/all', (req, res) => {
  Client.find((err, docs) => {
    err ? console.info(err) : res.json(docs);
  });
});

router.get('/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    err ? console.info(err) : res.json(client);
  });
});

router.route('/add').post((req, res) => {
  const item = new Client(req.body);
  console.info(item);
  item
    .save()
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

router.route('/delete').delete((req, res) => {
  console.info(req.body, 'DEL');
  Client.findByIdAndRemove({ _id: req.body.id }, (err, item) => {
    if (err) {
      res.json(err);
    } else {
      res.json('Deleted');
    }
  });
});

router.route('/update/:id').post((req, res) => {
  console.info(req.body, req.params.id);
  Client.findById(req.params.id, (err, item) => {
    if (item) {
      item.name = req.body.name;
      item.details = req.body.details;
      item.status = req.body.status;

      item
        .save()
        .then(item => res.json('Updated'))
        .catch(err => {
          res.status(400).send('unable to update the database');
        });
    } else {
      res.status(400).send('Could not load Document');
    }
  });
});

module.exports = router;
