'use strict';

/**
 * @ngdoc function
 * @name golApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the golApp
 */
angular.module('golApp')
  .controller('MainCtrl', function ($scope,RLE) {
  	$scope.showControls=false;
  	$scope.showSettings=false;
  	$scope.showAbout=false;
  	$scope.showPatterns=false;
  	$scope.patterns=RLE.getList();
  	$scope.currentPattern='101';
    $scope.canvas={width: '4096',height:'2048'};
   	$scope.navigatorBox={
   		scale:1,
   		x:0,
   		y:0,
   		width:$scope.canvas.width,
   		height:$scope.canvas.height
   	};
    // Find the right method, call on correct element
	function launchFullScreen(element) {
	  if(element.requestFullScreen) {
	    element.requestFullScreen();
	  } else if(element.mozRequestFullScreen) {
	    element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullScreen) {
	    element.webkitRequestFullScreen();
	  }
	}
	$scope.selectPattern=function(id){
		$scope.currentPattern=id;
	}
	$scope.launchFullScreen=function(){
		// Launch fullscreen for browsers that support it!
		launchFullScreen(document.documentElement); // the whole page
	};
	$scope.updateNavigatorBox=function(clientRect,scale){
		$scope.navigatorBox={
			scale: scale,
			x:clientRect.x,
			y:clientRect.y,
			width:clientRect.width,
			height:clientRect.height
		};
	};
	$scope.toggleControls=function(bool){
		$scope.showControls = bool;
	};
	$scope.toggleSettings=function(){
		$scope.showSettings = !$scope.showSettings;
	};
	$scope.toggleAbout=function(){
		$scope.showAbout = !$scope.showAbout;
	};
  });
