'use strict';

/**
 * @ngdoc function
 * @name golApp.controller:AboutctrlCtrl
 * @description
 * # AboutctrlCtrl
 * Controller of the golApp
 */
angular.module('golApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
