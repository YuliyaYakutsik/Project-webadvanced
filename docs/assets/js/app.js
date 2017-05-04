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

  var sideBarBlog = (function () {

    var sideBar = $('.nav-blog');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.nav-blog__toggle-link').on('click', _openSideBar);
      $(document).on('click', _closeSideBar);
    };

    var _openSideBar = function (e) {

      e.preventDefault();
      var $this = $(this);

      if ($this.hasClass('active')) {

        $this.removeClass('active');
        sideBar.removeClass('active');

      } else {

        $this.addClass('active');
        sideBar.addClass('active');

      }

    };

    var _closeSideBar = function (e) {

      var $this=$(e.target);

      if(!$this.closest(sideBar).length){
        $('.nav-blog__toggle-link').removeClass('active');
        sideBar.removeClass('active');
      }
    };

    return{

      init:init

    };

  })();

  //вызываем при условии
  if($('.parallax').length){
    myMouseParallax.init();
  }

  if($('.fullscreen-menu').length){
    burgerMenu.init();
  }

  if($('.blur').length){
    blurForm.init();
  }

  if($('.nav-blog').length){
    sideBarBlog.init();  
  }

})();


//вставка отстилизованной GoogleMap
function initMap() {

  var styleArray=[
    {
      featureType:'water',
      stylers:[{color:'#00bfa5'}]
    },
    {
      featureType:'landscape',
      elementType:'geometry.fill',
      stylers:[{color:'#ffffff'}]
    },
    {
      featureType:'landscape.man_made',
      elementType:'all',
      stylers:[{saturation:'-70'}]
    },
    {
      featureType:'landscape.natural',
      elementType:'all',
      stylers:[{visibility:'off'}]
    },
    {
      featureType:'poi',
      elementType:'labels',
      stylers:[{visibility:'off'}]
    },
    {
      featureType:'poi.park',
      elementType:'all',
      stylers:[{visibility:'off'}]
    },
    {
      featureType:'road',
      elementType:'all',
      stylers:[{lightness:'-5'}]
    },
    {
      featureType:'transit',
      elementType:'labels',
      stylers:[{visibility:'off'}]
    }
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.912838, lng: 27.569431},
    scrollwheel: false,
    styles:styleArray,
    zoom: 15
  });

  var marker = new google.maps.Marker({
    position: {lat: 53.910684, lng: 27.556924},
    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
    map: map,
    // Пишем название маркера - появится если навести на него курсор и немного подождать
    title: 'Мое местонахождение',
    // Укажем свою иконку для маркера
    icon: 'assets/img/map_marker_large.png'
  });
}

  


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgbXlNb3VzZVBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICBcdHZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuICBcdFxyXG4gIFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgXHRcdF9zZXRVcExpc3RlbmVycyAoKTtcclxuICBcdH07XHJcblxyXG4gIFx0dmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBcdFx0JCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBfbW92ZUxheWVycyk7XHJcbiAgXHR9O1xyXG5cclxuICBcdHZhciBfbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgXHRcdHZhciBtb3VzZVggPSBlLnBhZ2VYLFxyXG4gIFx0XHRcdG1vdXNlWSA9IGUucGFnZVksXHJcbiAgXHRcdFx0dyA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIG1vdXNlWCxcclxuICBcdFx0XHRoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlWTtcclxuXHJcbiAgXHRcdGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LHZhbHVlKSB7XHJcbiAgXHRcdFx0dmFyIGJvdHRvbVBvc2l0aW9uID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQvMikqKGtleS8xMDApKSxcclxuICBcdFx0XHRcdHdpZHRoUG9zaXRpb24gPSB3KihrZXkvMTAwKSxcclxuICBcdFx0XHRcdGhlaWdodFBvc2l0aW9uID0gaCooa2V5LzEwMCk7XHJcblxyXG4gIFx0XHRcdCQodmFsdWUpLmNzcygge1xyXG4gIFx0XHRcdFx0J2JvdHRvbSc6ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JyxcclxuICBcdFx0XHRcdCd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyt3aWR0aFBvc2l0aW9uKydweCwgJytoZWlnaHRQb3NpdGlvbisncHgsIDApJ1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9KTtcclxuICBcdH07XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0aW5pdDppbml0XHJcbiAgXHR9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYnVyZ2VyTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1lbnUgPSAkKCcuZnVsbHNjcmVlbi1tZW51Jyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5idXJnZXItbWVudV9fbGluaycpLm9uKCdjbGljaycsIF9vcGVuTWVudSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCAoKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCdib2R5JykuY3NzKCdwb3NpdGlvbicsJ3N0YXRpYycpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygncG9zaXRpb24nLCdmaXhlZCcpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYmx1ckZvcm0gPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciB3cmFwcGVyID0gJCgnLndyaXRlLW1lX19ibHVyLXdyYXBwZXInKSxcclxuICAgICAgICB3cmFwcGVyVG9wID0gJCgnLndyaXRlLW1lJyksXHJcbiAgICAgICAgZm9ybSA9ICQoJy53cml0ZS1tZV9fYmx1cicpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF9zZXRCbHVyKTtcclxuICAgICAgJChkb2N1bWVudCkucmVhZHkoX3NldEJsdXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldEJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgaW1nV2lkdGggPSAkKCcucmV2aWV3c19fYmFja2dyb3VuZCcpLndpZHRoKCksXHJcbiAgICAgICAgICBwb3NMZWZ0ID0gLSB3cmFwcGVyLnBvc2l0aW9uKCkubGVmdCxcclxuICAgICAgICAgIHBvc1RvcCA9IC0gd3JhcHBlclRvcC5wb3NpdGlvbigpLnRvcDtcclxuXHJcbiAgICAgIGZvcm0uY3NzKHtcclxuICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnKyAnICcgKyAnYXV0bycsXHJcbiAgICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyQmxvZyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLm5hdi1ibG9nX190b2dnbGUtbGluaycpLm9uKCdjbGljaycsIF9vcGVuU2lkZUJhcik7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIF9jbG9zZVNpZGVCYXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX29wZW5TaWRlQmFyID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbG9zZVNpZGVCYXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgaWYoISR0aGlzLmNsb3Nlc3Qoc2lkZUJhcikubGVuZ3RoKXtcclxuICAgICAgICAkKCcubmF2LWJsb2dfX3RvZ2dsZS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIC8v0LLRi9C30YvQstCw0LXQvCDQv9GA0Lgg0YPRgdC70L7QstC40LhcclxuICBpZigkKCcucGFyYWxsYXgnKS5sZW5ndGgpe1xyXG4gICAgbXlNb3VzZVBhcmFsbGF4LmluaXQoKTtcclxuICB9XHJcblxyXG4gIGlmKCQoJy5mdWxsc2NyZWVuLW1lbnUnKS5sZW5ndGgpe1xyXG4gICAgYnVyZ2VyTWVudS5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpZigkKCcuYmx1cicpLmxlbmd0aCl7XHJcbiAgICBibHVyRm9ybS5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpZigkKCcubmF2LWJsb2cnKS5sZW5ndGgpe1xyXG4gICAgc2lkZUJhckJsb2cuaW5pdCgpOyAgXHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcblxyXG4vL9Cy0YHRgtCw0LLQutCwINC+0YLRgdGC0LjQu9C40LfQvtCy0LDQvdC90L7QuSBHb29nbGVNYXBcclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuXHJcbiAgdmFyIHN0eWxlQXJyYXk9W1xyXG4gICAge1xyXG4gICAgICBmZWF0dXJlVHlwZTond2F0ZXInLFxyXG4gICAgICBzdHlsZXJzOlt7Y29sb3I6JyMwMGJmYTUnfV1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZlYXR1cmVUeXBlOidsYW5kc2NhcGUnLFxyXG4gICAgICBlbGVtZW50VHlwZTonZ2VvbWV0cnkuZmlsbCcsXHJcbiAgICAgIHN0eWxlcnM6W3tjb2xvcjonI2ZmZmZmZid9XVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZmVhdHVyZVR5cGU6J2xhbmRzY2FwZS5tYW5fbWFkZScsXHJcbiAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICBzdHlsZXJzOlt7c2F0dXJhdGlvbjonLTcwJ31dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBmZWF0dXJlVHlwZTonbGFuZHNjYXBlLm5hdHVyYWwnLFxyXG4gICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZmVhdHVyZVR5cGU6J3BvaScsXHJcbiAgICAgIGVsZW1lbnRUeXBlOidsYWJlbHMnLFxyXG4gICAgICBzdHlsZXJzOlt7dmlzaWJpbGl0eTonb2ZmJ31dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBmZWF0dXJlVHlwZToncG9pLnBhcmsnLFxyXG4gICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZmVhdHVyZVR5cGU6J3JvYWQnLFxyXG4gICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgc3R5bGVyczpbe2xpZ2h0bmVzczonLTUnfV1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZlYXR1cmVUeXBlOid0cmFuc2l0JyxcclxuICAgICAgZWxlbWVudFR5cGU6J2xhYmVscycsXHJcbiAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgIH1cclxuICBdO1xyXG5cclxuICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgIGNlbnRlcjoge2xhdDogNTMuOTEyODM4LCBsbmc6IDI3LjU2OTQzMX0sXHJcbiAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICBzdHlsZXM6c3R5bGVBcnJheSxcclxuICAgIHpvb206IDE1XHJcbiAgfSk7XHJcblxyXG4gIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgIHBvc2l0aW9uOiB7bGF0OiA1My45MTA2ODQsIGxuZzogMjcuNTU2OTI0fSxcclxuICAgIC8vINCj0LrQsNC30YvQstCw0LXQvCDQvdCwINC60LDQutC+0Lkg0LrQsNGA0YLQtSDQvtC9INC00L7Qu9C20LXQvSDQv9C+0Y/QstC40YLRgdGPLiAo0J3QsCDRgdGC0YDQsNC90LjRhtC1INCy0LXQtNGMINC80L7QttC10YIg0LHRi9GC0Ywg0LHQvtC70YzRiNC1INC+0LTQvdC+0Lkg0LrQsNGA0YLRiylcclxuICAgIG1hcDogbWFwLFxyXG4gICAgLy8g0J/QuNGI0LXQvCDQvdCw0LfQstCw0L3QuNC1INC80LDRgNC60LXRgNCwIC0g0L/QvtGP0LLQuNGC0YHRjyDQtdGB0LvQuCDQvdCw0LLQtdGB0YLQuCDQvdCwINC90LXQs9C+INC60YPRgNGB0L7RgCDQuCDQvdC10LzQvdC+0LPQviDQv9C+0LTQvtC20LTQsNGC0YxcclxuICAgIHRpdGxlOiAn0JzQvtC1INC80LXRgdGC0L7QvdCw0YXQvtC20LTQtdC90LjQtScsXHJcbiAgICAvLyDQo9C60LDQttC10Lwg0YHQstC+0Y4g0LjQutC+0L3QutGDINC00LvRjyDQvNCw0YDQutC10YDQsFxyXG4gICAgaWNvbjogJ2Fzc2V0cy9pbWcvbWFwX21hcmtlcl9sYXJnZS5wbmcnXHJcbiAgfSk7XHJcbn1cclxuXHJcbiAgXHJcblxyXG4iXX0=
