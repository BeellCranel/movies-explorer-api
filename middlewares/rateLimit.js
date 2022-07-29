const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
});

const createUserLimiter = rateLimit({
  wondowMs: 60 * 60 * 1000,
  max: 10,
  message: 'С вышего IP было создано слишком много аккаунтов, пожалуйста попробуйте снова через час',
});

module.exports = {
  limiter,
  createUserLimiter,
};
