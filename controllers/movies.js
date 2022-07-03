/* eslint-disable no-useless-return */
const Movie = require('../models/movie');
const BadReqError = require('../errors/BedReqError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Переданы некорректные данные при создании фильма'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Карточка с указанным _id не найдена');
      if (movie.owner.toString() !== req.user._id.toString()) throw new ForbiddenError('Карточка создана другим пользователем');
      return Movie.findByIdAndRemove(req.params._id)
        .then(() => res.status(200).send({ message: `фильм ${movie.nameRU} успешно удален` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError('Переданы некоректные данные'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
