'use strict';
/* jshint unused:vars */
/**
 * @ngdoc directive
 * @name golApp.directive:zoomable
 * @description
 * # zoomable
 */
angular.module('golApp')
  .directive('zoomable', function () {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
      	var imageX,
      	imageY,
      	screenX,
      	screenY,
      	prevOrigX,
      	scale=1,
      	previousScale,
      	upperLimit=12,
      	lowerLimit=1,
      	translateX=0,
      	translateY=0,
      	prevOrigY;
      	scope.mousePosition={};
        scope.mouseMove=function(event){
        	scope.mousePosition={
        		x:event.layerX,
        		y:event.layerY,
        		screenX:event.clientX,
        		screenY:event.clientY
        	};
        };
        scope.mouseWheel=function(event,delta,deltaX,deltaY){
        	if (delta > 0 && scale <= upperLimit)
	        {
	        	scale *= 1.1;
	        	scope.zoom(scale);
	        }
	        else if(delta < 0 && scale >=lowerLimit)
	        {
	        	scale /= 1.1;
	        	scope.zoom(scale);
	        }
        	
        };
        scope.zoom=function(scale){
	        // find current location on the image at the current scale
	        imageX = scope.mousePosition.x;
	        imageY = scope.mousePosition.y;
	        screenX= scope.mousePosition.screenX;
	        screenY= scope.mousePosition.screenY;
	        scale = (scale <= lowerLimit) ? lowerLimit : ((scale >= upperLimit) ? upperLimit : scale).toFixed(2);  //jshint ignore:line
	        // previous zooming frame translate
			translateX = (imageX-screenX)/scale;
		    translateY = (imageY-screenY)/scale;
			// set origin to current cursor position
			var newOrigX = imageX;
		    var newOrigY = imageY;
	        if ((Math.abs(imageX-prevOrigX)>1 || Math.abs(imageY-prevOrigY)>1) && previousScale < upperLimit) {
		        translateX = translateX + (imageX-prevOrigX)*(1-1/previousScale);
		        translateY = translateY + (imageY-prevOrigY)*(1-1/previousScale);
		    }
		    // stabilize position by zooming on previous cursor position
		    else if(previousScale !== 1 || (imageX !== prevOrigX && imageY !== prevOrigY)) {
		        newOrigX = imageX;
		        newOrigY = imageY;
		    }
		    prevOrigX=newOrigX;
		    prevOrigY=newOrigY;
		    previousScale=scale;
		    scope.updateNavigatorBox(element[0].getBoundingClientRect(),scale);
	        element.css({
	        	'-ms-transform':'scale('+scale+')',
	        	'-webkit-transform':'scale('+scale+')',
	        	'transform':'scale('+scale+')',
	        	'transform-origin':newOrigX+'px '+newOrigY+'px',
	        	'-webkit-transform-origin':newOrigX+'px '+newOrigY+'px',
	        	'-ms-transform-origin':newOrigX+'px '+newOrigY+'px',
	        	'-moz-transform-orign':newOrigX+'px '+newOrigY+'px'
	        });
        };
      }
    };
  });
