module.exports = (err, req, res, next) => {
  const { statusCode, name } = err;
  const errMessage = err.message;
  if (statusCode) {
    res.status(statusCode).send({
      errName: name,
      status: statusCode,
      message: `${name}: ${errMessage}. Код ошибки: ${statusCode}.`,
    });
    return;
  }
  res.status(500).send({
    errName: 'ServerError',
    status: 500,
    message: 'Произошла ошибка на сервере',
  });
  next();
};
