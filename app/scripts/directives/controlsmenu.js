'use strict';

/**
 * @ngdoc directive
 * @name golApp.directive:controlsMenu
 * @description
 * # controlsMenu
 */
angular.module('golApp')
  .directive('controlsMenu', function () {
    return {
      templateUrl:'views/controls.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
