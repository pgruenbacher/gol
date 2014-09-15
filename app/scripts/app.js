'use strict';

/**
 * @ngdoc overview
 * @name golApp
 * @description
 * # golApp
 *
 * Main module of the application.
 */
angular
  .module('golApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'monospaced.mousewheel'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app',{
      url:('/app'),
      templateUrl:'views/main.html',
      controller:'MainCtrl'
    })
    .state('app.frontpage',{
      views:{
  			'controls': {
	        templateUrl: 'views/controls.html',
	        controller: 'ControlsCtrl'
      	},
      	'settings': {
	        templateUrl: 'views/settings.html',
	        controller: 'SettingsCtrl'
      	},
      	'about': {
        	templateUrl: 'views/about.html',
	        controller: 'AboutCtrl'
      	},
    	}
    });
    $urlRouterProvider.otherwise('/app');
  });
