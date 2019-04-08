'use strict';

angular.module('seeing-clerly')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
  });