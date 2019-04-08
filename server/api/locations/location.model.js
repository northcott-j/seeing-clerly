'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');

var LocationSchema = new _mongoose2.default.Schema({
  Name: String,
  Population: Number,
  City: String,
  Campus: String,
  State: String,
  CrimeStats: _mongoose2.default.Schema.Types.Mixed
}, { collection: 'Locations' });

exports.default = _mongoose2.default.model('Location', LocationSchema);
//# sourceMappingURL=location.model.js.map
