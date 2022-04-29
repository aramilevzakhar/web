function requestTime(req, res, next) {
  req.requestTime = Date.now()
  next()
}

function b() {
	console.log('hello')
}

function logger(req, res, next) {};

