/* eslint-disable no-useless-return */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqError = require('../errors/BedReqError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizationError = require('../errors/UnauthorizedError');

const findUserBySelfId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь по указанному _id не найден');
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError('Переданы некорректные данные. Пользователь с этим Id отсутствует'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      email: req.body.email,
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с указанным _id не найден');
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Данный email занят другим пользователем'));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    name,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res
      .status(201)
      .send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadReqError('Переданы некорректные данные при создании пользователя'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === 'Unauthorized') {
        next(new UnauthorizationError('Неправильный льгин или пароль'));
        return;
      }
      next(err);
    });
};

module.exports = {
  findUserBySelfId,
  updateUser,
  createUser,
  login,
};
