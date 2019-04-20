'use strict';

angular.module('seeing-clerly')
  .config(function($routeProvider) {
    $routeProvider.when('/bostonography', {
      templateUrl: 'app/bostonography/bostonography.html',
      controller: 'BostonographyCtrl'
    })
  });
