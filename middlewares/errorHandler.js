// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) =>
  res.status(500).json({
    status: "error",
    message: err.message,
  });

module.exports = handleErrors;
