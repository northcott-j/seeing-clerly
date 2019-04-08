'use strict';

var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated(req, res) {
  var token = req.body.token || req.query.token || req.headers['X-Access-Token'] || req.cookies.token;
  if (!token) {
    res.status(401).send();
  } else {
    verifyToken(token, function (err, decoded) {
      if (err) {
        res.status(401).send();
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        res.status(200).send();
      }
    });
  }
}

// Checks route and redirects if necessary
function authenticateRoute(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['X-Access-Token'] || req.cookies.token;
  if (!token) {
    res.status(401).redirect('/login');
  } else {
    verifyToken(token, function (err, decoded) {
      if (err) {
        res.status(401).redirect('/login');
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        res.status(200).send();
        return next();
      }
    });
  }
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(user) {
  if (user.creator === 'God') {
    return jwt.sign(user, config.secrets.session, { expiresIn: '4d' });
  } else {
    return jwt.sign(user, config.secrets.session, { expiresIn: '20' });
  }
}

function verifyToken(token, callback) {
  if (token && token[0] === '"') {
    // means that there are extra quotes around the token
    token = token.substring(1, token.length - 1);
  }
  jwt.verify(token, config.secrets.session, callback);
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.authenticateRoute = authenticateRoute;
//# sourceMappingURL=auth.service.js.map
