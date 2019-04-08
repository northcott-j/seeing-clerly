'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'code' // this is the virtual field on the model
  }, function (username, password, done) {
    // FIXME : Only one possible password
    if (password !== 'liuoffshore') {
      return done(null, false, { message: 'This password is not correct.' });
    }
    return done(null, { username: username });
  }));
};
//# sourceMappingURL=passport.js.map
