require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const allowedCors = [
  'http://localhost:3000',
  'http://my-website.nomoredomains.xyz',
  'https://my-website.nomoredomains.xyz',
];

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(cors({
  origin: allowedCors,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
