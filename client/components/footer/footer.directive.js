'use strict';

angular.module('seeing-clerly')
  .directive('foot', () => ({
  templateUrl: 'components/footer/footer.html',
  restrict: 'E',
  controller: 'FooterController',
  controllerAs: 'footer'
}));