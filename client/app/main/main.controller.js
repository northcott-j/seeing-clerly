'use strict';

/*
Main controller file for the graphing logic; includes API calls for data
retrieval, form submission logic, and draw functions.
 */

angular.module('seeing-clerly')
  .controller('MainCtrl', function ($scope, $http, $timeout) {

    // Array for location data dicts
    var locData = [];

    // Dictionary to hold form values
    $scope.formData = {};

    // Reference to the current graph
    var activeGraph = null;

    // Queries the location data of all supported universities on load
    angular.element(document).ready(function () {
      initBoston($scope.drawGraph);
    });

    $scope.drawing = true;
    // Initializes data to Boston schools
    var initBoston = function (callback) {
      var bigFive = {
        harvard: '5cabe1f9c4d6320493342797',
        mit: '5cabe257c4d6320493343c1c',
        northeastern: '5cabe233c4d632049334343e',
        bu: '5cabe246c4d6320493343870',
        bc: '5cabe1f0c4d63204933425c3'
      };
      var bigFiveCounter = 5;
      for (var school in bigFive) {
        if (bigFive.hasOwnProperty(school)) {
          bigFiveCounter -= 1;
          getSchoolById(bigFive[school], function (nameInfo) {
            getSchoolData(nameInfo.id, 'Rape', function (crimeData) {
              var dataset = cleanData(crimeData);
              dataset.label = nameInfo.name + ' Crime: Rape';
              config.data.datasets.push(dataset);
            });
          });
          if (bigFiveCounter === 0) {
            if (callback) {
              $timeout(
                function () {
                  $scope.drawing = false;
                  callback();
                },
                 1500);
            }
          }
        }
      }
    };

    // Queries for a certain school's data
    var getSchoolID = function (schoolName, callback) {
      console.log('made it to getSchoolID for ' + schoolName);
      for (var i = 0; i < locData.length; i++) {
        var temp = locData[i];
        if (temp.name == schoolName) {
          if (callback) {
            callback(temp.id, temp);
          } else {
            return temp.id;
          }
        }
      }
    };

    // Used for when you only have the ID and need the other info such as name, population, campus
    // This uses the AngularJS Get method
    // FIXME :: Careful, this returns the response, and not just the body
    var getSchoolById = function (id, callback) {
      $http.get('/locations?id=' + id)
        .then(function (data) {
          if (callback) {
            callback(data.data[0])
          } else {
            return data.data[0];
          }
        })
    };

    // Gets the data available according to the provided school id and crime
    // TODO : Will need to change localhost to seeing-clerly.herokuapp.com
    var getSchoolData = function (id, crime, callback) {
      $http.get('/locations/data/' + id + '/' + (crime.replace(' ', '%20')))
          .then(function (crimeData) {
        if (callback) {
          callback(crimeData.data);
        } else {
          return crimeData.data;
        }
      });
    };

    // Parses raw query data into usable form
    // FIXME : Scale will always assume 2012-2015 - it was too difficult otherwise
    // FIXME : RESPONSE : most of the 2011 data isn't as well-supported anyways
    var cleanData = function (crimeData) {
      var dataset = {
        label: null,
        data: []
      };
      var labelCounter = config.data.labels.length;
      for (var year in config.data.labels) {
        if (config.data.labels.hasOwnProperty(year)) {
          year = config.data.labels[year];
          labelCounter -= 1;
          if (crimeData[year]) {
            dataset.data.push(crimeData[year]);
          } else {
            dataset.data.push(null);
          }
          if (labelCounter === 0) {
            return dataset;
          }
        }
      }
    };

    $scope.clearDatasets = function () {
      config.data.datasets = [];
      activeGraph.update();
    };

    // Helper for randomColor
    var randomColorFactor = function () {
      return Math.round(Math.random() * 255);
    };

    // Produces a random color - used to color area under the line
    var randomColor = function (opacity) {
      return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };

    // Config for the Line chart (to be passed into new Chart)
    var config = {
      type: 'line',
      data:     {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
        datasets: []
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: 'black'
            },
            scaleLabel: {
              display: true,
              labelString: 'Year'
            }
          }],
          yAxes: [{
            display: true,
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: '# of instances'
            }
          }]
        },
        borderWidth: 4,
        borderCapStyle: 'round',
        spanGaps: true,
        showLine: true,
        lineTension: 4
      }
    };

    // Helper method to search all schools
    $scope.schoolSearch = function(query){
      var filters = {name: query};
      if ($scope.formData.population) {
        filters.population = $scope.formData.population;
      }
      if ($scope.formData.city) {
        filters.city = $scope.formData.city;
      }
      if ($scope.formData.state && $scope.formData.state !== 'XX') {
        filters.state = $scope.formData.state;
      }
      return $http.get("/locations", {params: filters})
        .then(function(response){
          return response.data;
        })
    };

    // Helper method to fill in curve information
    var fillCurves = function (callback) {
      var datasetCounter = config.data.datasets.length;
      jQuery.each(config.data.datasets, function (i, dataset) {
        datasetCounter -= 1;
        var color = randomColor(0.3);
        dataset.borderColor = color;
        dataset.backgroundColor = color;
        dataset.pointBorderColor = color;
        dataset.pointBackgroundColor = color;
        dataset.pointBorderWidth = 1;
        if (datasetCounter === 0) {
          if (callback) {
            callback();
          }
        }
      });
    };

    // Draws the stored datasets on the graph
    $scope.drawGraph = function () {
      fillCurves(function () {
        var ctx = document.getElementById("canvas").getContext("2d");
        activeGraph = new Chart(ctx, config);
      });
    };

    // Refreshes the graph
    $scope.refreshGraph = function () {
      fillCurves(function () {
        activeGraph.update();
      })
    };

    // Could not add dataset for various reasons
    $scope.datasetAdditionError = false;

    // Adds a new dataset to the graph
    $scope.addDataset = function () {
      if ($scope.formData.school && $scope.formData.crime) {
        getSchoolById($scope.formData.school.id, function (nameInfo) {
          getSchoolData(nameInfo.id, $scope.formData.crime, function (crimeData) {
            var dataset = cleanData(crimeData);
            dataset.label = nameInfo.name + ' Crime: ' + $scope.formData.crime;
            config.data.datasets.push(dataset);
            $scope.datasetAdditionError = false;
            fillCurves(function () {
               activeGraph.update();
            });
          });
        });
      } else {
        $scope.datasetAdditionError = true;
      }
    };

    // Available crimes available to the Scope
    $scope.availableCrimes = ['Alcohol Arrests', 'Alcohol Referral', 'Stalking', 'Murder', 'Arson', 'Statutory Rape', 'Motor Vehicle Theft',
      'Aggravated Assault', 'Weapon Referral', 'Weapon Arrests', 'Incest', 'Drug Referral', 'Dating Violence', 'Domestic Violence',
      'Robbery', 'Burglary', 'Drug Arrests', 'Rape', 'Fondling'];

  });
