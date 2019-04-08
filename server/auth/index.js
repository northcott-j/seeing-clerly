'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');

// Passport Configuration
require('./local/passport').setup();

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
//# sourceMappingURL=index.js.map
