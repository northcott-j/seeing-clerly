'use strict';

angular.module('seeing-clerly')
  .directive('overview', () => ({
  templateUrl: 'components/overview/overview.html',
  restrict: 'E',
  controller: 'OverviewController',
  controllerAs: 'overview'
}));