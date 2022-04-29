function requestTime(req, res, next) {
  req.requestTime = Date.now()
  next()
}

function logger(req, res, next) {};

