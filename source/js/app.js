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