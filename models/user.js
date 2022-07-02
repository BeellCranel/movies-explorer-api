const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static.findUserByCredentials = function authentification(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неправильная почта или пароль');
      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) throw new UnauthorizedError('Неправильная почта или пароль');
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
