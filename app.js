require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// здесь будут руты

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
