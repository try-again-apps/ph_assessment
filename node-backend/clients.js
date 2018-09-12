const express = require('express');

const Client = require('./models/client');

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

module.exports = router;
