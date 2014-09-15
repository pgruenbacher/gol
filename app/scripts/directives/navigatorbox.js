'use strict';
/*jshint unused:vars */
/**
 * @ngdoc directive
 * @name golApp.directive:navigatorBox
 * @description
 * # navigatorBox
 */
angular.module('golApp')
  .directive('navigatorBox', function () {
    return {
		restrict: 'A',
		scope:true,
		link: function postLink(scope, element, attrs) {
			//initialize boundary box
			var parent=element.parent(),
			boundary, box;
	        attrs.$observe('box',function(){
	        	parent.css({
	        		height: parent[0].clientWidth/scope.canvas.width*scope.canvas.height+'px'
	        	});
    			box={
    	        		width: window.innerWidth,
    	        		height: window.innerHeight
    	        	};
	        	boundary=scope.navigatorBox;
	        	var navigatorBoxStyle={
	        		width:parent[0].clientWidth*box.width/boundary.width+'px',
	        		height:parent[0].clientHeight*box.height/boundary.height+'px',
	        		left:-1*boundary.x*parent[0].clientWidth/boundary.width+'px',
	        		top:-1*boundary.y*parent[0].clientHeight/boundary.height+'px'
	        	};
	        	element.css(navigatorBoxStyle);

	    	});
    	}
  	};
});
