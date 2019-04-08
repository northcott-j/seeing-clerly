'use strict';

angular.module('seeing-clerly')
  .config(function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'app/about/about.html',
      controller: 'AboutCtrl'
    })
  });