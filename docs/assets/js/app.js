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

  var burgerMenu = (function () {

    var menu = $('.fullscreen-menu');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.burger-menu__link').on('click', _openMenu);
    };

    var _openMenu = function (e) {

      e.preventDefault ();

      if ($(this).hasClass('active')) {

        $(this).removeClass('active');
        $('body').css('position','static');
        menu.slideUp();

      } else {

        $(this).addClass('active');
        $('body').css('position','fixed');
        menu.slideDown();

      }

    };

    return{

      init:init

    };

  })();

  burgerMenu.init();

  var blurForm = (function () {

    var wrapper = $('.write-me__blur-wrapper'),
        wrapperTop = $('.write-me'),
        form = $('.write-me__blur');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $(window).on('resize', _setBlur);
      $(document).ready(_setBlur);
    };

    var _setBlur = function () {

      var imgWidth = $('.reviews__background').width(),
          posLeft = - wrapper.position().left,
          posTop = - wrapperTop.position().top;

      form.css({
        'background-size': imgWidth + 'px'+ ' ' + 'auto',
        'backgroundPosition': posLeft + 'px' + ' ' + posTop + 'px'
      });

    };

    return{

      init:init

    };

  })();

  blurForm.init();
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgbXlNb3VzZVBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICBcdHZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuICBcdFxyXG4gIFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgXHRcdF9zZXRVcExpc3RlbmVycyAoKTtcclxuICBcdH07XHJcblxyXG4gIFx0dmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBcdFx0JCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBfbW92ZUxheWVycyk7XHJcbiAgXHR9O1xyXG5cclxuICBcdHZhciBfbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgXHRcdHZhciBtb3VzZVggPSBlLnBhZ2VYLFxyXG4gIFx0XHRcdG1vdXNlWSA9IGUucGFnZVksXHJcbiAgXHRcdFx0dyA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIG1vdXNlWCxcclxuICBcdFx0XHRoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlWTtcclxuXHJcbiAgXHRcdGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LHZhbHVlKSB7XHJcbiAgXHRcdFx0dmFyIGJvdHRvbVBvc2l0aW9uID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQvMikqKGtleS8xMDApKSxcclxuICBcdFx0XHRcdHdpZHRoUG9zaXRpb24gPSB3KihrZXkvMTAwKSxcclxuICBcdFx0XHRcdGhlaWdodFBvc2l0aW9uID0gaCooa2V5LzEwMCk7XHJcblxyXG4gIFx0XHRcdCQodmFsdWUpLmNzcygge1xyXG4gIFx0XHRcdFx0J2JvdHRvbSc6ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JyxcclxuICBcdFx0XHRcdCd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyt3aWR0aFBvc2l0aW9uKydweCwgJytoZWlnaHRQb3NpdGlvbisncHgsIDApJ1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9KTtcclxuICBcdH07XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0aW5pdDppbml0XHJcbiAgXHR9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICBteU1vdXNlUGFyYWxsYXguaW5pdCgpO1xyXG5cclxuICB2YXIgYnVyZ2VyTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1lbnUgPSAkKCcuZnVsbHNjcmVlbi1tZW51Jyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5idXJnZXItbWVudV9fbGluaycpLm9uKCdjbGljaycsIF9vcGVuTWVudSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCAoKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCdib2R5JykuY3NzKCdwb3NpdGlvbicsJ3N0YXRpYycpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygncG9zaXRpb24nLCdmaXhlZCcpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICBidXJnZXJNZW51LmluaXQoKTtcclxuXHJcbiAgdmFyIGJsdXJGb3JtID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgd3JhcHBlciA9ICQoJy53cml0ZS1tZV9fYmx1ci13cmFwcGVyJyksXHJcbiAgICAgICAgd3JhcHBlclRvcCA9ICQoJy53cml0ZS1tZScpLFxyXG4gICAgICAgIGZvcm0gPSAkKCcud3JpdGUtbWVfX2JsdXInKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfc2V0Qmx1cik7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KF9zZXRCbHVyKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRCbHVyID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIGltZ1dpZHRoID0gJCgnLnJldmlld3NfX2JhY2tncm91bmQnKS53aWR0aCgpLFxyXG4gICAgICAgICAgcG9zTGVmdCA9IC0gd3JhcHBlci5wb3NpdGlvbigpLmxlZnQsXHJcbiAgICAgICAgICBwb3NUb3AgPSAtIHdyYXBwZXJUb3AucG9zaXRpb24oKS50b3A7XHJcblxyXG4gICAgICBmb3JtLmNzcyh7XHJcbiAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6IGltZ1dpZHRoICsgJ3B4JysgJyAnICsgJ2F1dG8nLFxyXG4gICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCdcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICBibHVyRm9ybS5pbml0KCk7XHJcbn0pKCk7Il19
