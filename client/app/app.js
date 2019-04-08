'use strict';

angular.module('seeing-clerly', ['ngMaterial', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap']).config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue-grey');
  $routeProvider.otherwise({ redirectTo: '/'
  });
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});
//# sourceMappingURL=app.js.map
