const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const regex = require('../utils/regex');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailer: Joi.string().required().pattern(regex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.string().required(),
  }),
}), postMovie);

router.get('/movies', getMovies);

router.delete('/movies/_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
