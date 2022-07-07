const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { valCreateUser, valLogin } = require('../middlewares/validator');
const { crashTest, routerNFE } = require('../utils/constants');
const { limiter, createUserLimiter } = require('../middlewares/rateLimit');

router.get('/crash-test', limiter, () => {
  setTimeout(() => {
    throw new Error(crashTest);
  }, 0);
});
router.post('/signup', createUserLimiter, valCreateUser, createUser);
router.post('/signin', limiter, valLogin, login);
router.use(auth);
router.use('/', limiter, userRouter);
router.use('/', limiter, movieRouter);
router.use('*', limiter, (req, res, next) => {
  next(new NotFoundError(routerNFE));
});

module.exports = router;
