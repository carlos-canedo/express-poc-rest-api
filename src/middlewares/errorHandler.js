const HttpError = require("../utils/HttpError");

function errorHandler(err, req, res, next) {
  // Custom error
  if (err instanceof HttpError) {
    res.statusMessage = err.message;
    res.status(err.code).send();
    return;
  }

  // Json format error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.log(err);
    res.statusMessage = err.message;
    res.status(400).send();
    return;
  }

  // Server error
  res.statusMessage = "something went wrong";
  res.status(500).send();
}

module.exports = errorHandler;
