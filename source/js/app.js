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

  

