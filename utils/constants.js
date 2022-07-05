const postMovieValE = 'Переданы некорректные данные при создании фильма';
const deleteMovieNFE = 'Карточка с указанным _id не найдена';
const deleteMovieCastError = 'Переданы некоректные данные';
const findUserBySelfIdNFE = 'Пользователь по указанному _id не найден';
const findUserBySelfIdCastError = 'Переданы некорректные данные. Пользователь с этим Id отсутствует';
const updateUserNFE = 'Пользователь с указанным _id не найден';
const updateUserValE = 'Переданы некорректные данные при обновлении профиля';
const updateUserConflictE = 'Данный email занят другим пользователем';
const createUserConflictE = 'Такой пользователь уже зарегистрирован';
const createUserValE = 'Переданы некорректные данные при создании пользователя';
const loginUnauthorized = 'Неправильный льгин или пароль';
const crashTest = 'Сервер сейчас упадёт';
const routerNFE = 'Запрашиваемый ресурс не найден';

module.exports = {
  postMovieValE,
  deleteMovieNFE,
  deleteMovieCastError,
  findUserBySelfIdNFE,
  findUserBySelfIdCastError,
  updateUserNFE,
  updateUserValE,
  updateUserConflictE,
  createUserConflictE,
  createUserValE,
  loginUnauthorized,
  crashTest,
  routerNFE,
};
