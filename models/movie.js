const mongoose = require('mongoose');
const regex = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validator: ((v) => regex.test(v)),
  },
  trailerLink: {
    type: String,
    required: true,
    validator: ((v) => regex.test(v)),
  },
  thumbnail: {
    type: String,
    required: true,
    validator: ((v) => regex.test(v)),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
  nameEng: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.Schema('movie', movieSchema);
