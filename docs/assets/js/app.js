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

  var sideBarNavigation = (function () {

    var sideBar = $('.nav-blog');
    var sideBarList = $('.nav-blog__list');
    var sideBarWrapper = sideBar.closest('.container');
    var contentBarItem = sideBarWrapper.find('.content-blog__item');
    var sideBarItem = sideBarList.find('.nav-blog__link');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      $(window).scroll(_checkSection);
      $(document).ready(function() {

        sideBarItem.on('click', function(e) {
          e.preventDefault();          
          _showSection($(this).attr('href'), true);
        });

        _showSection(window.location.hash, false);

      });
      $(window).scroll(_SideBarFixed);
      $(window).on('resize scroll', _SideBarWidthFixed);
      
    };

    var _checkSection = function () {

      contentBarItem.each(function() {
        var $this = $(this),
            topEdge = $this.offset().top - 250,
            bottomEdge = topEdge + $this.height(),
            wScroll = $(window).scrollTop();

        if (topEdge <= wScroll && bottomEdge >= wScroll) {

          var currentId = $this.data('section');
          var reqLink = sideBarItem.filter('[href="#' + currentId + '"]');

          reqLink.closest('.nav-blog__item').addClass('active').siblings().removeClass('active');

          window.location.hash = currentId;

        }

      });

    };

    function _showSection (section, isAnimate) {
  
      var direction = section.replace(/#/, '');
      var reqSection = contentBarItem.filter('[data-section="' + direction + '"]');
      var reqSectionPos = reqSection.offset().top;

      if (isAnimate) {
        $('body, html').animate({scrollTop: reqSectionPos}, 500);
      } else {
        $('body, html').scrollTop(reqSectionPos);
      }
    }

    var _SideBarFixed = function () {

      var topEdge = sideBarWrapper.offset().top - 30,
          leftEdge = sideBarList.position().left,
          wScroll = $(document).scrollTop();

      if (topEdge <= wScroll) {

        sideBar.addClass('fixed');

      } else {

        sideBar.removeClass('fixed');
        
      }

    };

    var _SideBarWidthFixed = function () {

      var OSName = "Unknown OS";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
        else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
        else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

      var sideBarWidth = ($(window).width()>=1500)?((1500-40)*0.3+'px'):(OSName=="MacOS" && ($(window).width()<=768))?($(window).width()*0.6+'px'):(OSName!="MacOS" && $(window).width()<=(768-17))?($(window).width()*0.6+'px'):(($(window).width()-40)*0.3+'px');

      sideBar.css('width', sideBarWidth);

    };

    return{

      init:init

    };

  })();

  var flipper = (function () {

    var flipperContainer = $('.flipper');
    var authorizationLink = $('.authorization__link');
    var toMain = $('.authorization__form-button_back');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      authorizationLink.on('click', _flipperStart);
      $(document).on('click', _flipperEnd);
      toMain.on('click', _toMain);
    };

    var _flipperStart = function (e) {

      var $this = $(this);
      e.preventDefault();
      flipperContainer.addClass('active');
      $this.fadeOut(1000);

    };

    var _flipperEnd = function (e) {

      var $this=$(e.target);

      if(!$this.closest(flipperContainer).length && !$this.closest('.authorization').length){
        flipperContainer.removeClass('active');
        authorizationLink.fadeIn(1000);
      }

    };

    var _toMain = function (e) {

      var $this=$(this);

      e.preventDefault();
      flipperContainer.removeClass('active');
      authorizationLink.fadeIn(1000);

    };

    return{

      init:init

    };

  })();

  var preloader = (function () {

    var preloader = $('.preloader');
    var percentsTotal = 0;

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $(document).ready(_preloaderStart);
    };

    var _preloaderStart = function () {
      var myImages = imgPath.toArray();

      loadImages(myImages);
    };

    var imgPath = $('*').map(function(index, elem) {
        
      var background = $(elem).css('background-image'),
          img = $(elem).is('img'),
          path = '';

      if (background != 'none') {

        path = background.replace('url("', '').replace('")', '');

      }

      if (img) {

        path = $(elem).attr('src');

      }

      if (path) {
        return path;
      }

    });

    var setPercents = function (total, current) {

      var percents = Math.ceil(current/total*100);

      $('.preloader__percents').text(percents + '%');

      if (percents >=100) {
        setTimeout(function(){
          preloader.fadeOut()
        }, 500);
      }

    };

    var loadImages = function (images) {
      if (!images.length) {
        preloader.fadeOut();
      }

      images.forEach( function(element, index) {
        var fakeImage = $('<img>', {
          attr: {
            src: element
          }

        });

        fakeImage.on('load error', function() {

          percentsTotal++;
          setPercents(images.length, percentsTotal);

        });

      });

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
    sideBarNavigation.init();  
  }

  if($('.preloader').length){
    preloader.init();  
  }

  if($('.flipper').length){
    flipper.init();  
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
    center: {lat: 53.912838, lng: 27.566431},
    scrollwheel: false,
    styles:styleArray,
    zoom: 15,
    disableDefaultUI:true
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgbXlNb3VzZVBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICBcdHZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuICBcdFxyXG4gIFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgXHRcdF9zZXRVcExpc3RlbmVycyAoKTtcclxuICBcdH07XHJcblxyXG4gIFx0dmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBcdFx0JCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBfbW92ZUxheWVycyk7XHJcbiAgXHR9O1xyXG5cclxuICBcdHZhciBfbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgXHRcdHZhciBtb3VzZVggPSBlLnBhZ2VYLFxyXG4gIFx0XHRcdG1vdXNlWSA9IGUucGFnZVksXHJcbiAgXHRcdFx0dyA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIG1vdXNlWCxcclxuICBcdFx0XHRoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlWTtcclxuXHJcbiAgXHRcdGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LHZhbHVlKSB7XHJcbiAgXHRcdFx0dmFyIGJvdHRvbVBvc2l0aW9uID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQvMikqKGtleS8xMDApKSxcclxuICBcdFx0XHRcdHdpZHRoUG9zaXRpb24gPSB3KihrZXkvMTAwKSxcclxuICBcdFx0XHRcdGhlaWdodFBvc2l0aW9uID0gaCooa2V5LzEwMCk7XHJcblxyXG4gIFx0XHRcdCQodmFsdWUpLmNzcygge1xyXG4gIFx0XHRcdFx0J2JvdHRvbSc6ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JyxcclxuICBcdFx0XHRcdCd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyt3aWR0aFBvc2l0aW9uKydweCwgJytoZWlnaHRQb3NpdGlvbisncHgsIDApJ1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9KTtcclxuICBcdH07XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0aW5pdDppbml0XHJcbiAgXHR9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYnVyZ2VyTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1lbnUgPSAkKCcuZnVsbHNjcmVlbi1tZW51Jyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5idXJnZXItbWVudV9fbGluaycpLm9uKCdjbGljaycsIF9vcGVuTWVudSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCAoKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCdib2R5JykuY3NzKCdwb3NpdGlvbicsJ3N0YXRpYycpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygncG9zaXRpb24nLCdmaXhlZCcpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYmx1ckZvcm0gPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciB3cmFwcGVyID0gJCgnLndyaXRlLW1lX19ibHVyLXdyYXBwZXInKSxcclxuICAgICAgICB3cmFwcGVyVG9wID0gJCgnLndyaXRlLW1lJyksXHJcbiAgICAgICAgZm9ybSA9ICQoJy53cml0ZS1tZV9fYmx1cicpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF9zZXRCbHVyKTtcclxuICAgICAgJChkb2N1bWVudCkucmVhZHkoX3NldEJsdXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldEJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgaW1nV2lkdGggPSAkKCcucmV2aWV3c19fYmFja2dyb3VuZCcpLndpZHRoKCksXHJcbiAgICAgICAgICBwb3NMZWZ0ID0gLSB3cmFwcGVyLnBvc2l0aW9uKCkubGVmdCxcclxuICAgICAgICAgIHBvc1RvcCA9IC0gd3JhcHBlclRvcC5wb3NpdGlvbigpLnRvcDtcclxuXHJcbiAgICAgIGZvcm0uY3NzKHtcclxuICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnKyAnICcgKyAnYXV0bycsXHJcbiAgICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyQmxvZyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLm5hdi1ibG9nX190b2dnbGUtbGluaycpLm9uKCdjbGljaycsIF9vcGVuU2lkZUJhcik7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIF9jbG9zZVNpZGVCYXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX29wZW5TaWRlQmFyID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbG9zZVNpZGVCYXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgaWYoISR0aGlzLmNsb3Nlc3Qoc2lkZUJhcikubGVuZ3RoKXtcclxuICAgICAgICAkKCcubmF2LWJsb2dfX3RvZ2dsZS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyTmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuICAgIHZhciBzaWRlQmFyTGlzdCA9ICQoJy5uYXYtYmxvZ19fbGlzdCcpO1xyXG4gICAgdmFyIHNpZGVCYXJXcmFwcGVyID0gc2lkZUJhci5jbG9zZXN0KCcuY29udGFpbmVyJyk7XHJcbiAgICB2YXIgY29udGVudEJhckl0ZW0gPSBzaWRlQmFyV3JhcHBlci5maW5kKCcuY29udGVudC1ibG9nX19pdGVtJyk7XHJcbiAgICB2YXIgc2lkZUJhckl0ZW0gPSBzaWRlQmFyTGlzdC5maW5kKCcubmF2LWJsb2dfX2xpbmsnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoX2NoZWNrU2VjdGlvbik7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzaWRlQmFySXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgIFxyXG4gICAgICAgICAgX3Nob3dTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX3Nob3dTZWN0aW9uKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBmYWxzZSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgICAgJCh3aW5kb3cpLnNjcm9sbChfU2lkZUJhckZpeGVkKTtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgc2Nyb2xsJywgX1NpZGVCYXJXaWR0aEZpeGVkKTtcclxuICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2hlY2tTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgY29udGVudEJhckl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMjUwLFxyXG4gICAgICAgICAgICBib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpLFxyXG4gICAgICAgICAgICB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBpZiAodG9wRWRnZSA8PSB3U2Nyb2xsICYmIGJvdHRvbUVkZ2UgPj0gd1Njcm9sbCkge1xyXG5cclxuICAgICAgICAgIHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgICB2YXIgcmVxTGluayA9IHNpZGVCYXJJdGVtLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcclxuXHJcbiAgICAgICAgICByZXFMaW5rLmNsb3Nlc3QoJy5uYXYtYmxvZ19faXRlbScpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGN1cnJlbnRJZDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfc2hvd1NlY3Rpb24gKHNlY3Rpb24sIGlzQW5pbWF0ZSkge1xyXG4gIFxyXG4gICAgICB2YXIgZGlyZWN0aW9uID0gc2VjdGlvbi5yZXBsYWNlKC8jLywgJycpO1xyXG4gICAgICB2YXIgcmVxU2VjdGlvbiA9IGNvbnRlbnRCYXJJdGVtLmZpbHRlcignW2RhdGEtc2VjdGlvbj1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyk7XHJcbiAgICAgIHZhciByZXFTZWN0aW9uUG9zID0gcmVxU2VjdGlvbi5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICBpZiAoaXNBbmltYXRlKSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxU2VjdGlvblBvc30sIDUwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcChyZXFTZWN0aW9uUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfU2lkZUJhckZpeGVkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIHRvcEVkZ2UgPSBzaWRlQmFyV3JhcHBlci5vZmZzZXQoKS50b3AgLSAzMCxcclxuICAgICAgICAgIGxlZnRFZGdlID0gc2lkZUJhckxpc3QucG9zaXRpb24oKS5sZWZ0LFxyXG4gICAgICAgICAgd1Njcm9sbCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgaWYgKHRvcEVkZ2UgPD0gd1Njcm9sbCkge1xyXG5cclxuICAgICAgICBzaWRlQmFyLmFkZENsYXNzKCdmaXhlZCcpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgc2lkZUJhci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9TaWRlQmFyV2lkdGhGaXhlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciBPU05hbWUgPSBcIlVua25vd24gT1NcIjtcclxuICAgICAgICBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIldpblwiKSAhPSAtMSkgT1NOYW1lID0gXCJXaW5kb3dzXCI7XHJcbiAgICAgICAgZWxzZSBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1hY1wiKSAhPSAtMSkgT1NOYW1lID0gXCJNYWNPU1wiO1xyXG4gICAgICAgIGVsc2UgaWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJYMTFcIikgIT0gLTEpIE9TTmFtZSA9IFwiVU5JWFwiO1xyXG4gICAgICAgIGVsc2UgaWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJMaW51eFwiKSAhPSAtMSkgT1NOYW1lID0gXCJMaW51eFwiO1xyXG5cclxuICAgICAgdmFyIHNpZGVCYXJXaWR0aCA9ICgkKHdpbmRvdykud2lkdGgoKT49MTUwMCk/KCgxNTAwLTQwKSowLjMrJ3B4Jyk6KE9TTmFtZT09XCJNYWNPU1wiICYmICgkKHdpbmRvdykud2lkdGgoKTw9NzY4KSk/KCQod2luZG93KS53aWR0aCgpKjAuNisncHgnKTooT1NOYW1lIT1cIk1hY09TXCIgJiYgJCh3aW5kb3cpLndpZHRoKCk8PSg3NjgtMTcpKT8oJCh3aW5kb3cpLndpZHRoKCkqMC42KydweCcpOigoJCh3aW5kb3cpLndpZHRoKCktNDApKjAuMysncHgnKTtcclxuXHJcbiAgICAgIHNpZGVCYXIuY3NzKCd3aWR0aCcsIHNpZGVCYXJXaWR0aCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgZmxpcHBlciA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGZsaXBwZXJDb250YWluZXIgPSAkKCcuZmxpcHBlcicpO1xyXG4gICAgdmFyIGF1dGhvcml6YXRpb25MaW5rID0gJCgnLmF1dGhvcml6YXRpb25fX2xpbmsnKTtcclxuICAgIHZhciB0b01haW4gPSAkKCcuYXV0aG9yaXphdGlvbl9fZm9ybS1idXR0b25fYmFjaycpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhdXRob3JpemF0aW9uTGluay5vbignY2xpY2snLCBfZmxpcHBlclN0YXJ0KTtcclxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgX2ZsaXBwZXJFbmQpO1xyXG4gICAgICB0b01haW4ub24oJ2NsaWNrJywgX3RvTWFpbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfZmxpcHBlclN0YXJ0ID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlckNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICR0aGlzLmZhZGVPdXQoMTAwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2ZsaXBwZXJFbmQgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgaWYoISR0aGlzLmNsb3Nlc3QoZmxpcHBlckNvbnRhaW5lcikubGVuZ3RoICYmICEkdGhpcy5jbG9zZXN0KCcuYXV0aG9yaXphdGlvbicpLmxlbmd0aCl7XHJcbiAgICAgICAgZmxpcHBlckNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgYXV0aG9yaXphdGlvbkxpbmsuZmFkZUluKDEwMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3RvTWFpbiA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgJHRoaXM9JCh0aGlzKTtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlckNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIGF1dGhvcml6YXRpb25MaW5rLmZhZGVJbigxMDAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDA7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KF9wcmVsb2FkZXJTdGFydCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfcHJlbG9hZGVyU3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBteUltYWdlcyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgbG9hZEltYWdlcyhteUltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbihpbmRleCwgZWxlbSkge1xyXG4gICAgICAgIFxyXG4gICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbSkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXHJcbiAgICAgICAgICBpbWcgPSAkKGVsZW0pLmlzKCdpbWcnKSxcclxuICAgICAgICAgIHBhdGggPSAnJztcclxuXHJcbiAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG5cclxuICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGltZykge1xyXG5cclxuICAgICAgICBwYXRoID0gJChlbGVtKS5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbiAodG90YWwsIGN1cnJlbnQpIHtcclxuXHJcbiAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50L3RvdGFsKjEwMCk7XHJcblxyXG4gICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgaWYgKHBlcmNlbnRzID49MTAwKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKVxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xyXG4gICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbWFnZXMuZm9yRWFjaCggZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIHNyYzogZWxlbWVudFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICAvL9Cy0YvQt9GL0LLQsNC10Lwg0L/RgNC4INGD0YHQu9C+0LLQuNC4XHJcbiAgaWYoJCgnLnBhcmFsbGF4JykubGVuZ3RoKXtcclxuICAgIG15TW91c2VQYXJhbGxheC5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpZigkKCcuZnVsbHNjcmVlbi1tZW51JykubGVuZ3RoKXtcclxuICAgIGJ1cmdlck1lbnUuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaWYoJCgnLmJsdXInKS5sZW5ndGgpe1xyXG4gICAgYmx1ckZvcm0uaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgaWYoJCgnLm5hdi1ibG9nJykubGVuZ3RoKXtcclxuICAgIHNpZGVCYXJCbG9nLmluaXQoKTtcclxuICAgIHNpZGVCYXJOYXZpZ2F0aW9uLmluaXQoKTsgIFxyXG4gIH1cclxuXHJcbiAgaWYoJCgnLnByZWxvYWRlcicpLmxlbmd0aCl7XHJcbiAgICBwcmVsb2FkZXIuaW5pdCgpOyAgXHJcbiAgfVxyXG5cclxuICBpZigkKCcuZmxpcHBlcicpLmxlbmd0aCl7XHJcbiAgICBmbGlwcGVyLmluaXQoKTsgIFxyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuLy/QstGB0YLQsNCy0LrQsCDQvtGC0YHRgtC40LvQuNC30L7QstCw0L3QvdC+0LkgR29vZ2xlTWFwXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcblxyXG4gIHZhciBzdHlsZUFycmF5PVtcclxuICAgIHtcclxuICAgICAgZmVhdHVyZVR5cGU6J3dhdGVyJyxcclxuICAgICAgc3R5bGVyczpbe2NvbG9yOicjMDBiZmE1J31dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBmZWF0dXJlVHlwZTonbGFuZHNjYXBlJyxcclxuICAgICAgZWxlbWVudFR5cGU6J2dlb21ldHJ5LmZpbGwnLFxyXG4gICAgICBzdHlsZXJzOlt7Y29sb3I6JyNmZmZmZmYnfV1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZlYXR1cmVUeXBlOidsYW5kc2NhcGUubWFuX21hZGUnLFxyXG4gICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgc3R5bGVyczpbe3NhdHVyYXRpb246Jy03MCd9XVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZmVhdHVyZVR5cGU6J2xhbmRzY2FwZS5uYXR1cmFsJyxcclxuICAgICAgZWxlbWVudFR5cGU6J2FsbCcsXHJcbiAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZlYXR1cmVUeXBlOidwb2knLFxyXG4gICAgICBlbGVtZW50VHlwZTonbGFiZWxzJyxcclxuICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZmVhdHVyZVR5cGU6J3BvaS5wYXJrJyxcclxuICAgICAgZWxlbWVudFR5cGU6J2FsbCcsXHJcbiAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGZlYXR1cmVUeXBlOidyb2FkJyxcclxuICAgICAgZWxlbWVudFR5cGU6J2FsbCcsXHJcbiAgICAgIHN0eWxlcnM6W3tsaWdodG5lc3M6Jy01J31dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBmZWF0dXJlVHlwZTondHJhbnNpdCcsXHJcbiAgICAgIGVsZW1lbnRUeXBlOidsYWJlbHMnLFxyXG4gICAgICBzdHlsZXJzOlt7dmlzaWJpbGl0eTonb2ZmJ31dXHJcbiAgICB9XHJcbiAgXTtcclxuXHJcbiAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICBjZW50ZXI6IHtsYXQ6IDUzLjkxMjgzOCwgbG5nOiAyNy41NjY0MzF9LFxyXG4gICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgc3R5bGVzOnN0eWxlQXJyYXksXHJcbiAgICB6b29tOiAxNSxcclxuICAgIGRpc2FibGVEZWZhdWx0VUk6dHJ1ZVxyXG4gIH0pO1xyXG5cclxuICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICBwb3NpdGlvbjoge2xhdDogNTMuOTEwNjg0LCBsbmc6IDI3LjU1NjkyNH0sXHJcbiAgICAvLyDQo9C60LDQt9GL0LLQsNC10Lwg0L3QsCDQutCw0LrQvtC5INC60LDRgNGC0LUg0L7QvSDQtNC+0LvQttC10L0g0L/QvtGP0LLQuNGC0YHRjy4gKNCd0LAg0YHRgtGA0LDQvdC40YbQtSDQstC10LTRjCDQvNC+0LbQtdGCINCx0YvRgtGMINCx0L7Qu9GM0YjQtSDQvtC00L3QvtC5INC60LDRgNGC0YspXHJcbiAgICBtYXA6IG1hcCxcclxuICAgIC8vINCf0LjRiNC10Lwg0L3QsNC30LLQsNC90LjQtSDQvNCw0YDQutC10YDQsCAtINC/0L7Rj9Cy0LjRgtGB0Y8g0LXRgdC70Lgg0L3QsNCy0LXRgdGC0Lgg0L3QsCDQvdC10LPQviDQutGD0YDRgdC+0YAg0Lgg0L3QtdC80L3QvtCz0L4g0L/QvtC00L7QttC00LDRgtGMXHJcbiAgICB0aXRsZTogJ9Cc0L7QtSDQvNC10YHRgtC+0L3QsNGF0L7QttC00LXQvdC40LUnLFxyXG4gICAgLy8g0KPQutCw0LbQtdC8INGB0LLQvtGOINC40LrQvtC90LrRgyDQtNC70Y8g0LzQsNGA0LrQtdGA0LBcclxuICAgIGljb246ICdhc3NldHMvaW1nL21hcF9tYXJrZXJfbGFyZ2UucG5nJ1xyXG4gIH0pO1xyXG59Il19
