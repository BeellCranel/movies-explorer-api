const router = require('express').Router();
const { findUserBySelfId, updateUser } = require('../controllers/users');
const { valUpdateUser } = require('../middlewares/validator');

router.get('/users/me', findUserBySelfId);
router.patch('/users/me', valUpdateUser, updateUser);

module.exports = router;
