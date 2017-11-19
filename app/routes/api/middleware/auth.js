var router = require('express').Router();
var jwt = require('express-jwt');
var secret = require('../../../config').secret;

function fromHeaderOrQuerystring (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

var required = router.use(jwt({
	secret,
	userProperty: 'user',
	getToken: fromHeaderOrQuerystring,
}));

var optional = router.use(jwt({
	secret,
	userProperty: 'user',
	getToken: fromHeaderOrQuerystring,
	credentialsRequired: false,
}));

module.exports = {required, optional};