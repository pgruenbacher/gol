'use strict';

/**
 * @ngdoc directive
 * @name golApp.directive:aboutMenu
 * @description
 * # aboutMenu
 */
angular.module('golApp')
  .directive('aboutMenu', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the aboutMenu directive');
      }
    };
  });
