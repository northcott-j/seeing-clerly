'use strict';

angular.module('seeing-clerly')
  .directive('navbar', () => ({
  templateUrl: 'components/header/navHeader.html',
  restrict: 'E',
  scope: {
    currentPage: '=page'
  },
  controller: 'NavHeaderController',
  controllerAs: 'navHeader'
}));