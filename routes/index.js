const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const NotFoundError = require('../errors/NotFoundError');

router.use(requestLogger);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.use(auth);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
router.use(errorLogger);
router.use(errors()); // обработчик ошибок celebrate
router.use(errorHandler);

module.exports = router;
