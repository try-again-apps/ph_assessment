const express = require('express');

const Client = require('./models/client');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/clients', (req, res) => {
  res.json({});
});

router.route('/add').post((req, res) => {
  console.info(req.body);
  const item = new Client(req.body);
  console.info(item);
  item
    .save()
    .then(item => {
      res.json('Added');
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

module.exports = router;
