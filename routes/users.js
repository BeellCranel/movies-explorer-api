const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findUserBySelfId,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', findUserBySelfId);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().unique().email(),
    name: Joi.string().required(),
  }),
}), updateUser);

module.exports = router;
