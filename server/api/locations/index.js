
'use strict';

var express = require('express');
var controller = require('./locations.controller.js');

var router = express.Router();

router.get('/', controller.listLocations);
router.get('/data/:id?/:stat?/:year?', controller.locationData);
router.get('/stats/:crime/:year', controller.locationStatistics);
router.get('/cities', controller.getCities);

module.exports = router;
//# sourceMappingURL=index.js.map
