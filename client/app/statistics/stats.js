'use strict';

angular.module('seeing-clerly')
  .config(function($routeProvider) {
    $routeProvider.when('/statsfinder', {
      templateUrl: 'app/statistics/stats.html',
      controller: 'StatsCtrl'
    })
  });