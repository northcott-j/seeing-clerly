
'use strict';

var _location = require('./location.model');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a JSON of all available locations and Mongo _id
exports.listLocations = function (req, res, all) {
  // TODO :: Add crime option and year to this
  var filters = {};
  if (req.query.state) {
    filters.State = req.query.state.toUpperCase();
  }
  if (req.query.population) {
    filters.Population = { $gt: req.query.population };
  }
  if (req.query.city) {
    filters.City = req.query.city.toUpperCase();
  }
  if (req.query.name) {
    filters.Name = { $regex: req.query.name.toUpperCase() };
  }
  if (req.query.id) {
    filters._id = req.query.id;
  }
  _location2.default.find(filters, function (err, locations) {
    if (locations && locations.length > 0) {
      var locationArray = [];
      var locationCounter = locations.length;
      locations.forEach(function (location) {
        locationCounter -= 1;
        if (all === 1) {
          locationArray.push(location);
        } else {
          locationArray.push({
            id: location._id,
            name: location.Name,
            population: location.Population,
            city: location.City,
            campus: location.Campus,
            state: location.State
          });
        }
        if (locationCounter === 0) {
          res.status(200).send(locationArray);
          return null;
        }
      });
    } else {
      res.status(200).send([]);
    }
  }).catch(function () {
    res.status(501).send('Could not retrieve list of locations.');
  });
};

// Returns a locations x, y data to be used in the chart
exports.locationData = function (req, res) {
  var id = req.params.id;
  var stat = req.params.stat;
  var year = req.params.year;
  if (id) {
    _location2.default.findById(id).exec().then(function (location) {
      if (location) {
        if (stat) {
          if (year) {
            res.status(200).send(location.CrimeStats[stat][year].toString());
          } else {
            res.status(200).send(location.CrimeStats[stat]);
          }
        } else {
          res.status(200).send(location.CrimeStats);
        }
      } else {
        res.status(200).send([]);
      }
    }).catch(function () {
      res.status(500).send("Error: Mongo query failed");
    });
  } else {
    exports.listLocations(req, res, 1);
  }
};

// Gets all unique cities
exports.getCities = function (req, res) {
  var filters = {};
  if (req.query.state) {
    filters.State = req.query.state.toUpperCase();
  }
  if (req.query.city) {
    filters.City = { $regex: req.query.city.toUpperCase() };
  }
  if (req.query.population) {
    filters.Population = { $gt: req.query.population };
  }
  _location2.default.distinct('City', filters, function (errors, cities) {
    if (errors) {
      res.status(500).send("Error: Mongo query failed");
    } else if (cities) {
      res.status(200).send(cities);
    } else {
      res.status(200).send([]);
    }
  });
};

/*
* Returns the following statistics based on request filters
*
* The Sample n
* The Sample Mean
*   Need to track Sum
* Median
* IQR
*   Q1
*   Q2
* The Sample Variance
* The Sample Standard Deviation
* The Percent Variation
* The Sample Range
* The Sample Max {School: Number}
* The Sample Min {School: Number}
*
*/
exports.locationStatistics = function (req, res) {
  var crime = req.params.crime;
  var year = req.params.year;
  var filters = {};
  if (req.query.state) {
    filters.State = req.query.state.toUpperCase();
  }
  if (req.query.population) {
    filters.Population = { $gt: req.query.population };
  }
  if (req.query.city) {
    filters.City = req.query.city.toUpperCase();
  }
  // Useable locations acc
  var cleanLocations = [];
  // Number of locations
  var numLocations = 0;
  // Location with max occurrence
  var maxLocation = { name: "", campus: "", val: 0 };
  // Location with min occurrence
  var minLocation = { name: "", campus: "", val: null };
  // Range of max and min
  var crimeRange = 0;
  // Q1
  var crimeQ1 = 0;
  // Q3
  var crimeQ3 = 0;
  // IQR
  var crimeIQR = 0;
  // Median
  var crimeMedian = 0;
  // Sum of crime info
  var crimeSum = 0;
  // Mean number of occurrence for crime
  var crimeMean = 0;
  // Variance for the crime
  var crimeVariance = 0;
  // Standard Deviation for the crime
  var crimeStandDev = 0;
  // Percent Variation for the crime
  var crimePercVar = 0;

  _location2.default.find(filters, function (err, locations) {
    if (locations && locations.length > 0) {
      var locationCounter = locations.length;
      locations.forEach(function (location) {
        locationCounter -= 1;
        if (location['CrimeStats'][crime] && location['CrimeStats'][crime][year] && location['CrimeStats'][crime][year] > 0) {
          var locationCrimeVal = location['CrimeStats'][crime][year];
          numLocations += 1;
          crimeSum += locationCrimeVal;
          if (locationCrimeVal > maxLocation.val) {
            maxLocation.name = location.Name;
            maxLocation.campus = location.Campus;
            maxLocation.val = locationCrimeVal;
          }
          if (!minLocation.val || locationCrimeVal < minLocation.val) {
            minLocation.name = location.Name;
            minLocation.campus = location.Campus;
            minLocation.val = locationCrimeVal;
          }
          cleanLocations.push(location);
        }
        if (locationCounter === 0) {
          var cleanLocationCounter = numLocations;
          crimeMean = crimeSum / numLocations;
          crimeRange = maxLocation.val - minLocation.val;
          cleanLocations.sort(function (a, b) {
            return a['CrimeStats'][crime][year] - b['CrimeStats'][crime][year];
          });
          if (cleanLocations.length > 0) {
            cleanLocations.forEach(function (cleanLocation) {
              var cleanLocationCrimeVal = cleanLocation['CrimeStats'][crime][year];
              cleanLocationCounter -= 1;
              crimeVariance += Math.pow(cleanLocationCrimeVal - crimeMean, 2);
              if (cleanLocationCounter === 0) {
                if (numLocations * 0.25 === parseInt(numLocations * 0.25) && numLocations * 0.25 > 0) {
                  crimeQ1 = (cleanLocations[numLocations * 0.25 - 1]['CrimeStats'][crime][year] + cleanLocations[numLocations * 0.25]['CrimeStats'][crime][year]) / 2;
                } else {
                  crimeQ1 = cleanLocations[Math.max(parseInt(numLocations * 0.25 - 1), 0)]['CrimeStats'][crime][year];
                }
                if (numLocations * 0.50 === parseInt(numLocations * 0.50)) {
                  crimeMedian = (cleanLocations[numLocations * 0.50 - 1]['CrimeStats'][crime][year] + cleanLocations[numLocations * 0.50]['CrimeStats'][crime][year]) / 2;
                } else {
                  crimeMedian = cleanLocations[parseInt(numLocations * 0.50)]['CrimeStats'][crime][year];
                }
                if (numLocations * 0.75 === parseInt(numLocations * 0.75)) {
                  crimeQ3 = (cleanLocations[numLocations * 0.75 - 1]['CrimeStats'][crime][year] + cleanLocations[numLocations * 0.75]['CrimeStats'][crime][year]) / 2;
                } else {
                  crimeQ3 = cleanLocations[parseInt(numLocations * 0.75 - 1)]['CrimeStats'][crime][year];
                }
                crimeIQR = crimeQ3 - crimeQ1;
                crimeVariance = crimeVariance / (numLocations - 1);
                crimeStandDev = Math.sqrt(crimeVariance);
                crimePercVar = crimeStandDev / crimeMean * 100;
                res.status(200).send({
                  sampleSize: numLocations,
                  max: maxLocation,
                  min: minLocation,
                  range: crimeRange,
                  iqr: crimeIQR,
                  median: crimeMedian,
                  mean: crimeMean,
                  variance: crimeVariance,
                  standDev: crimeStandDev,
                  percVar: crimePercVar
                });
                return null;
              }
            });
          } else {
            res.status(404).send('No schools fit your parameters.');
          }
        }
      });
    } else {
      res.status(404).send('No schools fit your parameters.');
    }
  }).catch(function () {
    res.status(501).send('Could not calculate statistics for filtered locations.');
  });
};
//# sourceMappingURL=locations.controller.js.map
