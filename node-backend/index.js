const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3010;

mongoose.connect('mongodb://mongodb')
  .then(() => console.log('Backend Started'))
  .catch(err => {
    console.error('Backend error:', err.stack);
    process.exit(1);
  });

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(basePath, todoListRoutes);

app.listen(PORT, () => {
  console.log('Assesment Backend running on Port: ', PORT);
});
