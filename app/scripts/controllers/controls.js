'use strict';

/**
 * @ngdoc function
 * @name golApp.controller:ControlsctrlCtrl
 * @description
 * # ControlsctrlCtrl
 * Controller of the golApp
 */
angular.module('golApp')
  .controller('ControlCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
