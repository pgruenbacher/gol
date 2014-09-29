'use strict';
/*jshint unused:vars*/
/**
 * @ngdoc directive
 * @name golApp.directive:patternSelect
 * @description
 * # patternSelect
 */
angular.module('golApp')
  .directive('patternSelect', function () {
    return {
      templateUrl:'views/patternMenu.html',
      restrict: 'E',

      link: function postLink(scope, element, attrs) {
      }
    };
  });
