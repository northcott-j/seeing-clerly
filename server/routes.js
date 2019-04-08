/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {

  // Insert routes below
  app.use('/locations', require('./api/locations'));

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
