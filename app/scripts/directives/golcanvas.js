'use strict';
/*jshint unused:vars*/
/**
 * @ngdoc directive
 * @name golApp.directive:golCanvas
 * @description
 * # golCanvas
 */
angular.module('golApp')
  .directive('golCanvas', function ($document,RLE) {
  	function Link(scope,element,attrs) {
  		var $canvas = element;
  		var _this = element;
	    _this.gol=gol;
  		var gol = new GOL($canvas[0],attrs.golPixelSize).draw().start(); //jshint ignore:line
	    element.drag = null;
	    $canvas.on('mousedown', function(event) {
	        var pos = gol.eventCoord(event);
	        if(event.which===1){
	        	_this.drag = event.which;
	        	gol.poke(pos[0], pos[1], _this.drag === 1);
	        	gol.draw();
	        }else if(event.which===3){
	        	RLE.getPattern(scope.currentPattern,function(array,width,height){
	        		gol.pattern(array,pos[0],pos[1],width,height);
	        		gol.draw();
	        	});
	        }
	    });
	    $canvas.on('mouseup', function(event) {
	        _this.drag = null;
	    });
	    $canvas.on('mousemove', function(event) {
	        if (_this.drag) {
	            var pos = gol.eventCoord(event);
	            gol.poke(pos[0], pos[1], _this.drag === 1);
	            gol.draw();
	        }
	    });
	    $canvas.on('contextmenu', function(event) {
	        event.preventDefault();
	        return false;
	    });
	    scope.$watch('navigatorBox',function(){
	    });
	    $document.on('keyup', function(event) {
	        switch (event.which) {
	        case 82: /* r */
	            gol.setRandom();
	            gol.draw();
	            break;
	        case 46: /* [delete] */
	            gol.setEmpty();
	            gol.draw();
	            break;
	        case 32: /* [space] */
	            gol.toggle();
	            break;
	        case 83: /* s */
	            if (event.shiftKey) {
	                if (this._save){
	                	gol.set(this._save);
	                }
	            } else {
	                this._save = gol.get();
	            }
	            break;
	        }
	    });
	}
    return {
      restrict: 'A',
      link: Link
    };
  });

  /**
 * Manages the user interface for a simulation.
 */
