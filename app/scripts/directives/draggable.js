'use strict';

/**
 * @ngdoc directive
 * @name golApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('golApp')
  .directive('draggable', function ($document) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
      var startX = 0, startY = 0, x=0, y=0,
	    parent=element.parent(),
	    differenceLeft,
	    differenceTop;

	    parent.css({
	      position: 'relative'
	    });
	    element.css({
	      position: 'absolute'
	    });

	    element[0].addEventListener('resized',function(){
	      console.log('resized');
	      containment();
	    });
	    element.on('mousedown', function(event) {
	      // Prevent default dragging of selected content
	      event.preventDefault();
	      if(attrs.draggable === 'true'){
	        startX = event.screenX - x;
	        startY = event.screenY - y;
	        console.log('start',startX,startY,x,y);
	        element.removeClass('transition-05s');
	        $document.on('mousemove', mousemove);
	        $document.on('mouseup', mouseup);
	      }
	    });
	    function containment(){
	      //left=element[0].offsetLeft;
	      //top=element[0].offsetTop;
	      differenceLeft=parent[0].clientWidth-element[0].clientWidth;
	      differenceTop=parent[0].clientHeight-element[0].clientHeight;
	    	if(x >= 0 && x <= differenceLeft){
	      	element.css({left: x+'px'});
	      }else if(x < 0){
	      	x=0;
	      	element.css({left: x+'px'});
	      }
	      else if(x > differenceLeft){
	      	x=differenceLeft;
	      	element.css({left: differenceLeft+'px'});
	      }
	      if(y >= 0 && y <= differenceTop){
	      	element.css({
	      		top: y+'px'
	      	});
	      }
	      else if(y < 0){
	      	y=0;
	      	element.css({top: '0px'});
	      }
	      else if(y > differenceTop){
	      	y=differenceTop;
	      	element.css({top: differenceTop+'px'});
	      }
	    }
	    function mousemove(event) {
	    	console.log('mousemove');
	      y = event.screenY - startY;
	      x = event.screenX - startX;
	      containment();
	    }
	    function mouseup() {
	      $document.off('mousemove', mousemove);
	      $document.off('mouseup', mouseup);
	    }
      }
    };
  });
