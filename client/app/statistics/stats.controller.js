'use strict';

/*
Main controller file for the graphing logic; includes API calls for data
retrieval, form submission logic, and draw functions.
 */

angular.module('seeing-clerly')
  .controller('StatsCtrl', function ($scope, $http) {
    $scope.formData = {};

    $scope.returnedStats = {};
    $scope.showStats = false;
    // Helper method to search cities
    $scope.citySearch = function(query){
      var filters = {city: query};
      if ($scope.formData.population) {
        filters.population = $scope.formData.population;
      }
      if ($scope.formData.state && $scope.formData.state !== 'XX') {
        filters.state = $scope.formData.state;
      }
      return $http.get("/locations/cities", {params: filters})
        .then(function(response){
          return response.data;
        })
    };

    $scope.processing = false;
    $scope.processingError = false;
    $scope.failedSample = false;
    $scope.retrieveStats = function () {
      if ($scope.formData.crime && $scope.formData.year) {
        $scope.processing = true;
        var filters = {};
        var crime = $scope.formData.crime;
        var year = $scope.formData.year;
        if ($scope.formData.population) {
          filters.population = $scope.formData.population;
        }
        if ($scope.formData.state && $scope.formData.state !== 'XX') {
          filters.state = $scope.formData.state;
        }
        if ($scope.formData.city) {
          filters.city = $scope.formData.city;
        }
        $http.get("/locations/stats/" + crime + "/" + year, {params: filters})
          .then(function successCallback(response) {
            $scope.processingError = false;
            $scope.processing = false;
            $scope.showStats = true;
            $scope.failedSample = false;
            $scope.returnedStats = response.data;
          }, function errorCallback(response) {
            $scope.failedSample = true;
            $scope.processingError = false;
            $scope.showStats = false;
            $scope.returnedStats = {};
            $scope.processing = false;
          })
      } else {
        $scope.processingError = true;
        $scope.processing = false;
        $scope.returnedStats = {};
        $scope.showStats = false;
      }
    };

    // All US states + DC + PR
    $scope.states = {
      'XX': 'NO FILTER',
      'AK': 'Alaska',
      'AL': 'Alabama',
      'AR': 'Arkansas',
      'AS': 'American Samoa',
      'AZ': 'Arizona',
      'CA': 'California',
      'CO': 'Colorado',
      'CT': 'Connecticut',
      'DC': 'District of Columbia',
      'DE': 'Delaware',
      'FL': 'Florida',
      'GA': 'Georgia',
      'GU': 'Guam',
      'HI': 'Hawaii',
      'IA': 'Iowa',
      'ID': 'Idaho',
      'IL': 'Illinois',
      'IN': 'Indiana',
      'KS': 'Kansas',
      'KY': 'Kentucky',
      'LA': 'Louisiana',
      'MA': 'Massachusetts',
      'MD': 'Maryland',
      'ME': 'Maine',
      'MI': 'Michigan',
      'MN': 'Minnesota',
      'MO': 'Missouri',
      'MP': 'Northern Mariana Islands',
      'MS': 'Mississippi',
      'MT': 'Montana',
      'NA': 'National',
      'NC': 'North Carolina',
      'ND': 'North Dakota',
      'NE': 'Nebraska',
      'NH': 'New Hampshire',
      'NJ': 'New Jersey',
      'NM': 'New Mexico',
      'NV': 'Nevada',
      'NY': 'New York',
      'OH': 'Ohio',
      'OK': 'Oklahoma',
      'OR': 'Oregon',
      'PA': 'Pennsylvania',
      'PR': 'Puerto Rico',
      'RI': 'Rhode Island',
      'SC': 'South Carolina',
      'SD': 'South Dakota',
      'TN': 'Tennessee',
      'TX': 'Texas',
      'UT': 'Utah',
      'VA': 'Virginia',
      'VI': 'Virgin Islands',
      'VT': 'Vermont',
      'WA': 'Washington',
      'WI': 'Wisconsin',
      'WV': 'West Virginia',
      'WY': 'Wyoming'
    };

    // Available crimes available to the Scope
    $scope.availableCrimes = ['Alcohol Arrests', 'Alcohol Referral', 'Stalking', 'Murder', 'Arson', 'Statutory Rape', 'Motor Vehicle Theft',
      'Aggravated Assault', 'Weapon Referral', 'Weapon Arrests', 'Incest', 'Drug Referral', 'Dating Violence', 'Domestic Violence',
      'Robbery', 'Burglary', 'Drug Arrests', 'Rape', 'Fondling'];

    // Available years
    $scope.availableYears = ['2012', '2013', '2014', '2015', '2016', '2017']
  });
