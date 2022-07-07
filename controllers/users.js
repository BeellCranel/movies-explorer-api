/* eslint-disable no-useless-return */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqError = require('../errors/BedReqError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizationError = require('../errors/UnauthorizedError');
const {
  findUserBySelfIdNFE,
  findUserBySelfIdCastError,
  updateUserNFE,
  updateUserValE,
  updateUserConflictE,
  createUserConflictE,
  createUserValE,
  loginUnauthorized,
} = require('../utils/constants');

const findUserBySelfId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError(findUserBySelfIdNFE);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError(findUserBySelfIdCastError));
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
      if (!user) throw new NotFoundError(updateUserNFE);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError(updateUserValE));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(updateUserConflictE));
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
        next(new ConflictError(createUserConflictE));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadReqError(createUserValE));
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
      return res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Unauthorized') {
        next(new UnauthorizationError(loginUnauthorized));
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
