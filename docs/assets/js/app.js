(function() {
  'use strict';

  var myMouseParallax = (function () {
  	var layer = $('.parallax').find('.parallax__layer');
  	
  	var init = function () {
  		_setUpListeners ();
  	};

  	var _setUpListeners = function () {
  		$(window).on('mousemove', _moveLayers);
  	};

  	var _moveLayers = function (e) {
  		var mouseX = e.pageX,
  			mouseY = e.pageY,
  			w = (window.innerWidth/2) - mouseX,
  			h = (window.innerHeight/2) - mouseY;

  		layer.map(function (key,value) {
  			var bottomPosition = ((window.innerHeight/2)*(key/100)),
  				widthPosition = w*(key/100),
  				heightPosition = h*(key/100);

  			$(value).css( {
  				'bottom': '-' + bottomPosition + 'px',
  				'transform': 'translate3d('+widthPosition+'px, '+heightPosition+'px, 0)'
  			});
  		});
  	};

  	return {
  		init:init
  	};

  })();

  myMouseParallax.init();

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIHZhciBteU1vdXNlUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gIFx0dmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG4gIFx0XHJcbiAgXHR2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICBcdFx0X3NldFVwTGlzdGVuZXJzICgpO1xyXG4gIFx0fTtcclxuXHJcbiAgXHR2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIFx0XHQkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIF9tb3ZlTGF5ZXJzKTtcclxuICBcdH07XHJcblxyXG4gIFx0dmFyIF9tb3ZlTGF5ZXJzID0gZnVuY3Rpb24gKGUpIHtcclxuICBcdFx0dmFyIG1vdXNlWCA9IGUucGFnZVgsXHJcbiAgXHRcdFx0bW91c2VZID0gZS5wYWdlWSxcclxuICBcdFx0XHR3ID0gKHdpbmRvdy5pbm5lcldpZHRoLzIpIC0gbW91c2VYLFxyXG4gIFx0XHRcdGggPSAod2luZG93LmlubmVySGVpZ2h0LzIpIC0gbW91c2VZO1xyXG5cclxuICBcdFx0bGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksdmFsdWUpIHtcclxuICBcdFx0XHR2YXIgYm90dG9tUG9zaXRpb24gPSAoKHdpbmRvdy5pbm5lckhlaWdodC8yKSooa2V5LzEwMCkpLFxyXG4gIFx0XHRcdFx0d2lkdGhQb3NpdGlvbiA9IHcqKGtleS8xMDApLFxyXG4gIFx0XHRcdFx0aGVpZ2h0UG9zaXRpb24gPSBoKihrZXkvMTAwKTtcclxuXHJcbiAgXHRcdFx0JCh2YWx1ZSkuY3NzKCB7XHJcbiAgXHRcdFx0XHQnYm90dG9tJzogJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnLFxyXG4gIFx0XHRcdFx0J3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnK3dpZHRoUG9zaXRpb24rJ3B4LCAnK2hlaWdodFBvc2l0aW9uKydweCwgMCknXHJcbiAgXHRcdFx0fSk7XHJcbiAgXHRcdH0pO1xyXG4gIFx0fTtcclxuXHJcbiAgXHRyZXR1cm4ge1xyXG4gIFx0XHRpbml0OmluaXRcclxuICBcdH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIG15TW91c2VQYXJhbGxheC5pbml0KCk7XHJcblxyXG59KSgpOyJdfQ==
