require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const allowedCors = [
  'http://localhost:3000',
  'http://my-website.nomoredomains.xyz',
  'https://my-website.nomoredomains.xyz',
];
const { PORT = 3000, dataMovies = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();
mongoose.connect(dataMovies);
app.use(helmet());
app.use(cors({
  origin: allowedCors,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT);
