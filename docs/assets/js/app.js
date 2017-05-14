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

  var slider = (function () {

    var counter = 1,
        duration = 500,
        inProcess = false;

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.slider__link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            sliderContainer = $this.closest('.slider'),
            items = $('.slider__display_first').find('.slider__item'),
            itemsDescription = sliderContainer.find('.works__item'),
            itemsDescriptionContainer = itemsDescription.closest('.works__list');

        if (!inProcess) {
          inProcess = true;

          if ($this.hasClass('slider__link_down')) {
            counter--;
          } else {
            counter++;
          }

          if (counter > items.length-1) {
            counter = 0
          }

          if (counter < 0) {
            counter = items.length-1
          }

          var mainSrc = items.eq(counter).find('img').attr('src');

          var activePicFadeOut = $.Deferred(),
              activePicLoaded = $.Deferred(),
              activePicFadeIn = $.Deferred(),
              descContainerFadeOut = $.Deferred(),
              descContainerChanged = $.Deferred(),
              descContainerFadeIn = $.Deferred(),
              sliderChangeFinished = $.Deferred();

          $('.slider__active-pic').fadeOut(250, function(){
            activePicFadeOut.resolve();
          });

          activePicFadeOut.done (function() {
            $('.slider__active-pic').attr('src', mainSrc).on('load', function () {
              activePicLoaded.resolve();
            });
          });

          activePicLoaded.done (function (){
            $('.slider__active-pic').fadeIn(250, function () {
              activePicFadeIn.resolve();
            });
          });

          itemsDescriptionContainer.fadeOut(220, function() {
            descContainerFadeOut.resolve();
          });

          descContainerFadeOut.done (function () {
            itemsDescription.filter('.active').removeClass('active');
            itemsDescription.eq(counter).addClass('active');
            descContainerChanged.resolve();
          });

          descContainerChanged.done (function () {
            itemsDescriptionContainer.fadeIn(220, function () {
              descContainerFadeIn.resolve();
            });
          });

          if ($this.hasClass('slider__link_down')) {
            _showNextSlide($('.slider__display_first'), 'up');
            _showNextSlide($('.slider__display_opposite'), 'down');
            sliderChangeFinished.resolve();
          } else {
            _showNextSlide($('.slider__display_first'), 'down');
            _showNextSlide($('.slider__display_opposite'), 'up');
            sliderChangeFinished.resolve();
          }

          $.when (activePicFadeIn, descContainerFadeIn, sliderChangeFinished).done (function () {
            inProcess = false;
          });
        }

      });
    };

    var _showNextSlide = function (container, direction) {

      var innerCounter = counter,
          items = container.find('.slider__item'),
          oldItem = items.filter('.active');

      if (container.hasClass('slider__display_first')) {
        (innerCounter - 1 < 0) ? innerCounter = items.length-1 : innerCounter-- ;
      } else {
        (innerCounter + 1 > items.length-1) ? innerCounter = 0 : innerCounter++ ;
      }

      var newItem = items.eq(innerCounter);

      _onSlide(newItem, oldItem, direction);

    };

    var _onSlide = function (newItem, oldItem, direction) {

      var direction = (direction == 'down')? 100 : -100;

      newItem.css('top', direction*(-1) + '%');
      oldItem.animate({'top': direction +'%'}, duration);
      newItem.animate({'top': '0'}, duration, function(){
        newItem.siblings().removeClass('active');
        newItem.addClass('active');
      });
    };

    return{

      init:init

    };

  })();

  var downArrow = (function () {

    var scrollTo = $('.section_to_scroll');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      $('.down-arrow').on('click', function(e) {
        e.preventDefault();          
        _scrollToSection();
      });
    };

    var _scrollToSection = function () {
  
      var reqPos = scrollTo.offset().top;

      $('body, html').animate({scrollTop: reqPos}, 500);

    };

    return{

      init:init

    };

  })();

  var upArrow = (function () {

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      $('.up-arrow').on('click', function(e) {
        e.preventDefault();          
        _scrollToTop();
      });
    };

    var _scrollToTop = function () {

      $('body, html').animate({scrollTop: 0}, 500);

    };

    return{

      init:init

    };

  })();

  var writeMe = (function () {

    var form = $('#reviews__form');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      form.on('submit', function (e) {
        e.preventDefault();
        _clearMessagesAndInputStyles();
        _contactMeFormInitialization();
      });

      $('.reviews__form-button-reset').on('click', function(e) {
        e.preventDefault();
        form[0].reset();
        _clearMessagesAndInputStyles();        
      });

    };

    var _clearMessagesAndInputStyles = function() {

      $('.reviews-form__messages-alert').slideUp(300);
      form.find('.reviews__form-element').each(function () {
          $(this).removeClass('input-alert');
      });

    };

    var _contactMeFormInitialization = function () {

        var formdata = form.serialize(),
            sendName = $('#sendName').val(),
            sendEmail = $('#sendEmail').val(),
            sendText = $('#sendText').val();

        if (!sendName.trim() || !sendEmail.trim() || !sendText.trim()) {

            $('#emptyFieldsDanger').slideDown(300, function () {
                _populateAndHighlightEmptyInputs();
            });
            return false;

        } else { 

            $('#onChecking').show('fast');

        }
    };

    var _populateAndHighlightEmptyInputs = function() {

      var emptyInputs = [];

      $('#reviews__form').find('.reviews__form-element').each(function () {
        if (!$(this).val().trim()) {
            emptyInputs.push($(this));
        }
      });

      console.log(emptyInputs);

      _highlightEmptyInputs(emptyInputs);

    };

    var _highlightEmptyInputs = function(emptyInputs) {

      emptyInputs.forEach(function (entry) {
          $(entry).addClass('input-alert');
      });

    };

    return{

      init:init

    };

  })();

  //вставка отстилизованной GoogleMap
  var initMap = (function () {

    var init = function () {

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
    };

    return{

      init:init

    };

  })();

  $(document).ready(function() {

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

    if($('.slider').length){
      slider.init();  
    }

    if($('.down-arrow').length){
      downArrow.init();  
    }

    if($('.up-arrow').length){
      upArrow.init();  
    }

    if($('.write-me').length){
      writeMe.init();  
    }

    if($('.map').length){
      initMap.init();  
    }

  });

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgbXlNb3VzZVBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICBcdHZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuICBcdFxyXG4gIFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgXHRcdF9zZXRVcExpc3RlbmVycyAoKTtcclxuICBcdH07XHJcblxyXG4gIFx0dmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBcdFx0JCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBfbW92ZUxheWVycyk7XHJcbiAgXHR9O1xyXG5cclxuICBcdHZhciBfbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgXHRcdHZhciBtb3VzZVggPSBlLnBhZ2VYLFxyXG4gIFx0XHRcdG1vdXNlWSA9IGUucGFnZVksXHJcbiAgXHRcdFx0dyA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIG1vdXNlWCxcclxuICBcdFx0XHRoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlWTtcclxuXHJcbiAgXHRcdGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LHZhbHVlKSB7XHJcbiAgXHRcdFx0dmFyIGJvdHRvbVBvc2l0aW9uID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQvMikqKGtleS8xMDApKSxcclxuICBcdFx0XHRcdHdpZHRoUG9zaXRpb24gPSB3KihrZXkvMTAwKSxcclxuICBcdFx0XHRcdGhlaWdodFBvc2l0aW9uID0gaCooa2V5LzEwMCk7XHJcblxyXG4gIFx0XHRcdCQodmFsdWUpLmNzcygge1xyXG4gIFx0XHRcdFx0J2JvdHRvbSc6ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JyxcclxuICBcdFx0XHRcdCd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyt3aWR0aFBvc2l0aW9uKydweCwgJytoZWlnaHRQb3NpdGlvbisncHgsIDApJ1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9KTtcclxuICBcdH07XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0aW5pdDppbml0XHJcbiAgXHR9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYnVyZ2VyTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1lbnUgPSAkKCcuZnVsbHNjcmVlbi1tZW51Jyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5idXJnZXItbWVudV9fbGluaycpLm9uKCdjbGljaycsIF9vcGVuTWVudSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCAoKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCdib2R5JykuY3NzKCdwb3NpdGlvbicsJ3N0YXRpYycpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygncG9zaXRpb24nLCdmaXhlZCcpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYmx1ckZvcm0gPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciB3cmFwcGVyID0gJCgnLndyaXRlLW1lX19ibHVyLXdyYXBwZXInKSxcclxuICAgICAgICB3cmFwcGVyVG9wID0gJCgnLndyaXRlLW1lJyksXHJcbiAgICAgICAgZm9ybSA9ICQoJy53cml0ZS1tZV9fYmx1cicpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF9zZXRCbHVyKTtcclxuICAgICAgJChkb2N1bWVudCkucmVhZHkoX3NldEJsdXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldEJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgaW1nV2lkdGggPSAkKCcucmV2aWV3c19fYmFja2dyb3VuZCcpLndpZHRoKCksXHJcbiAgICAgICAgICBwb3NMZWZ0ID0gLSB3cmFwcGVyLnBvc2l0aW9uKCkubGVmdCxcclxuICAgICAgICAgIHBvc1RvcCA9IC0gd3JhcHBlclRvcC5wb3NpdGlvbigpLnRvcDtcclxuXHJcbiAgICAgIGZvcm0uY3NzKHtcclxuICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnKyAnICcgKyAnYXV0bycsXHJcbiAgICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyQmxvZyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLm5hdi1ibG9nX190b2dnbGUtbGluaycpLm9uKCdjbGljaycsIF9vcGVuU2lkZUJhcik7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIF9jbG9zZVNpZGVCYXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX29wZW5TaWRlQmFyID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbG9zZVNpZGVCYXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgaWYoISR0aGlzLmNsb3Nlc3Qoc2lkZUJhcikubGVuZ3RoKXtcclxuICAgICAgICAkKCcubmF2LWJsb2dfX3RvZ2dsZS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyTmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuICAgIHZhciBzaWRlQmFyTGlzdCA9ICQoJy5uYXYtYmxvZ19fbGlzdCcpO1xyXG4gICAgdmFyIHNpZGVCYXJXcmFwcGVyID0gc2lkZUJhci5jbG9zZXN0KCcuY29udGFpbmVyJyk7XHJcbiAgICB2YXIgY29udGVudEJhckl0ZW0gPSBzaWRlQmFyV3JhcHBlci5maW5kKCcuY29udGVudC1ibG9nX19pdGVtJyk7XHJcbiAgICB2YXIgc2lkZUJhckl0ZW0gPSBzaWRlQmFyTGlzdC5maW5kKCcubmF2LWJsb2dfX2xpbmsnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoX2NoZWNrU2VjdGlvbik7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzaWRlQmFySXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgIFxyXG4gICAgICAgICAgX3Nob3dTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX3Nob3dTZWN0aW9uKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBmYWxzZSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgICAgJCh3aW5kb3cpLnNjcm9sbChfU2lkZUJhckZpeGVkKTtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgc2Nyb2xsJywgX1NpZGVCYXJXaWR0aEZpeGVkKTtcclxuICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2hlY2tTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgY29udGVudEJhckl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMjUwLFxyXG4gICAgICAgICAgICBib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpLFxyXG4gICAgICAgICAgICB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBpZiAodG9wRWRnZSA8PSB3U2Nyb2xsICYmIGJvdHRvbUVkZ2UgPj0gd1Njcm9sbCkge1xyXG5cclxuICAgICAgICAgIHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgICB2YXIgcmVxTGluayA9IHNpZGVCYXJJdGVtLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcclxuXHJcbiAgICAgICAgICByZXFMaW5rLmNsb3Nlc3QoJy5uYXYtYmxvZ19faXRlbScpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGN1cnJlbnRJZDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfc2hvd1NlY3Rpb24gKHNlY3Rpb24sIGlzQW5pbWF0ZSkge1xyXG4gIFxyXG4gICAgICB2YXIgZGlyZWN0aW9uID0gc2VjdGlvbi5yZXBsYWNlKC8jLywgJycpO1xyXG4gICAgICB2YXIgcmVxU2VjdGlvbiA9IGNvbnRlbnRCYXJJdGVtLmZpbHRlcignW2RhdGEtc2VjdGlvbj1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyk7XHJcbiAgICAgIHZhciByZXFTZWN0aW9uUG9zID0gcmVxU2VjdGlvbi5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICBpZiAoaXNBbmltYXRlKSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxU2VjdGlvblBvc30sIDUwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcChyZXFTZWN0aW9uUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfU2lkZUJhckZpeGVkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIHRvcEVkZ2UgPSBzaWRlQmFyV3JhcHBlci5vZmZzZXQoKS50b3AgLSAzMCxcclxuICAgICAgICAgIGxlZnRFZGdlID0gc2lkZUJhckxpc3QucG9zaXRpb24oKS5sZWZ0LFxyXG4gICAgICAgICAgd1Njcm9sbCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgaWYgKHRvcEVkZ2UgPD0gd1Njcm9sbCkge1xyXG5cclxuICAgICAgICBzaWRlQmFyLmFkZENsYXNzKCdmaXhlZCcpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgc2lkZUJhci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9TaWRlQmFyV2lkdGhGaXhlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciBPU05hbWUgPSBcIlVua25vd24gT1NcIjtcclxuICAgICAgICBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIldpblwiKSAhPSAtMSkgT1NOYW1lID0gXCJXaW5kb3dzXCI7XHJcbiAgICAgICAgZWxzZSBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1hY1wiKSAhPSAtMSkgT1NOYW1lID0gXCJNYWNPU1wiO1xyXG4gICAgICAgIGVsc2UgaWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJYMTFcIikgIT0gLTEpIE9TTmFtZSA9IFwiVU5JWFwiO1xyXG4gICAgICAgIGVsc2UgaWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJMaW51eFwiKSAhPSAtMSkgT1NOYW1lID0gXCJMaW51eFwiO1xyXG5cclxuICAgICAgdmFyIHNpZGVCYXJXaWR0aCA9ICgkKHdpbmRvdykud2lkdGgoKT49MTUwMCk/KCgxNTAwLTQwKSowLjMrJ3B4Jyk6KE9TTmFtZT09XCJNYWNPU1wiICYmICgkKHdpbmRvdykud2lkdGgoKTw9NzY4KSk/KCQod2luZG93KS53aWR0aCgpKjAuNisncHgnKTooT1NOYW1lIT1cIk1hY09TXCIgJiYgJCh3aW5kb3cpLndpZHRoKCk8PSg3NjgtMTcpKT8oJCh3aW5kb3cpLndpZHRoKCkqMC42KydweCcpOigoJCh3aW5kb3cpLndpZHRoKCktNDApKjAuMysncHgnKTtcclxuXHJcbiAgICAgIHNpZGVCYXIuY3NzKCd3aWR0aCcsIHNpZGVCYXJXaWR0aCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgZmxpcHBlciA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGZsaXBwZXJDb250YWluZXIgPSAkKCcuZmxpcHBlcicpO1xyXG4gICAgdmFyIGF1dGhvcml6YXRpb25MaW5rID0gJCgnLmF1dGhvcml6YXRpb25fX2xpbmsnKTtcclxuICAgIHZhciB0b01haW4gPSAkKCcuYXV0aG9yaXphdGlvbl9fZm9ybS1idXR0b25fYmFjaycpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhdXRob3JpemF0aW9uTGluay5vbignY2xpY2snLCBfZmxpcHBlclN0YXJ0KTtcclxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgX2ZsaXBwZXJFbmQpO1xyXG4gICAgICB0b01haW4ub24oJ2NsaWNrJywgX3RvTWFpbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfZmxpcHBlclN0YXJ0ID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlckNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICR0aGlzLmZhZGVPdXQoMTAwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2ZsaXBwZXJFbmQgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgaWYoISR0aGlzLmNsb3Nlc3QoZmxpcHBlckNvbnRhaW5lcikubGVuZ3RoICYmICEkdGhpcy5jbG9zZXN0KCcuYXV0aG9yaXphdGlvbicpLmxlbmd0aCl7XHJcbiAgICAgICAgZmxpcHBlckNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgYXV0aG9yaXphdGlvbkxpbmsuZmFkZUluKDEwMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3RvTWFpbiA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgJHRoaXM9JCh0aGlzKTtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlckNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIGF1dGhvcml6YXRpb25MaW5rLmZhZGVJbigxMDAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDA7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KF9wcmVsb2FkZXJTdGFydCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfcHJlbG9hZGVyU3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBteUltYWdlcyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgbG9hZEltYWdlcyhteUltYWdlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbihpbmRleCwgZWxlbSkge1xyXG4gICAgICAgIFxyXG4gICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbSkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXHJcbiAgICAgICAgICBpbWcgPSAkKGVsZW0pLmlzKCdpbWcnKSxcclxuICAgICAgICAgIHBhdGggPSAnJztcclxuXHJcbiAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG5cclxuICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGltZykge1xyXG5cclxuICAgICAgICBwYXRoID0gJChlbGVtKS5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbiAodG90YWwsIGN1cnJlbnQpIHtcclxuXHJcbiAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50L3RvdGFsKjEwMCk7XHJcblxyXG4gICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgaWYgKHBlcmNlbnRzID49MTAwKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKVxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xyXG4gICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbWFnZXMuZm9yRWFjaCggZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIHNyYzogZWxlbWVudFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgc2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgY291bnRlciA9IDEsXHJcbiAgICAgICAgZHVyYXRpb24gPSA1MDAsXHJcbiAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5zbGlkZXJfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzbGlkZXJDb250YWluZXIgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJyksXHJcbiAgICAgICAgICAgIGl0ZW1zID0gJCgnLnNsaWRlcl9fZGlzcGxheV9maXJzdCcpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgaXRlbXNEZXNjcmlwdGlvbiA9IHNsaWRlckNvbnRhaW5lci5maW5kKCcud29ya3NfX2l0ZW0nKSxcclxuICAgICAgICAgICAgaXRlbXNEZXNjcmlwdGlvbkNvbnRhaW5lciA9IGl0ZW1zRGVzY3JpcHRpb24uY2xvc2VzdCgnLndvcmtzX19saXN0Jyk7XHJcblxyXG4gICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICBpblByb2Nlc3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19saW5rX2Rvd24nKSkge1xyXG4gICAgICAgICAgICBjb3VudGVyLS07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNvdW50ZXIgPiBpdGVtcy5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgICBjb3VudGVyID0gMFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjb3VudGVyIDwgMCkge1xyXG4gICAgICAgICAgICBjb3VudGVyID0gaXRlbXMubGVuZ3RoLTFcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgbWFpblNyYyA9IGl0ZW1zLmVxKGNvdW50ZXIpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAgIHZhciBhY3RpdmVQaWNGYWRlT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgIGFjdGl2ZVBpY0xvYWRlZCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICBhY3RpdmVQaWNGYWRlSW4gPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgZGVzY0NvbnRhaW5lckZhZGVPdXQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgZGVzY0NvbnRhaW5lckNoYW5nZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgZGVzY0NvbnRhaW5lckZhZGVJbiA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICBzbGlkZXJDaGFuZ2VGaW5pc2hlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAkKCcuc2xpZGVyX19hY3RpdmUtcGljJykuZmFkZU91dCgyNTAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGFjdGl2ZVBpY0ZhZGVPdXQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgYWN0aXZlUGljRmFkZU91dC5kb25lIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9fYWN0aXZlLXBpYycpLmF0dHIoJ3NyYycsIG1haW5TcmMpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGFjdGl2ZVBpY0xvYWRlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgYWN0aXZlUGljTG9hZGVkLmRvbmUgKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19hY3RpdmUtcGljJykuZmFkZUluKDI1MCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGFjdGl2ZVBpY0ZhZGVJbi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaXRlbXNEZXNjcmlwdGlvbkNvbnRhaW5lci5mYWRlT3V0KDIyMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRlc2NDb250YWluZXJGYWRlT3V0LnJlc29sdmUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGRlc2NDb250YWluZXJGYWRlT3V0LmRvbmUgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaXRlbXNEZXNjcmlwdGlvbi5maWx0ZXIoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGl0ZW1zRGVzY3JpcHRpb24uZXEoY291bnRlcikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBkZXNjQ29udGFpbmVyQ2hhbmdlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBkZXNjQ29udGFpbmVyQ2hhbmdlZC5kb25lIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zRGVzY3JpcHRpb25Db250YWluZXIuZmFkZUluKDIyMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGRlc2NDb250YWluZXJGYWRlSW4ucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19saW5rX2Rvd24nKSkge1xyXG4gICAgICAgICAgICBfc2hvd05leHRTbGlkZSgkKCcuc2xpZGVyX19kaXNwbGF5X2ZpcnN0JyksICd1cCcpO1xyXG4gICAgICAgICAgICBfc2hvd05leHRTbGlkZSgkKCcuc2xpZGVyX19kaXNwbGF5X29wcG9zaXRlJyksICdkb3duJyk7XHJcbiAgICAgICAgICAgIHNsaWRlckNoYW5nZUZpbmlzaGVkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9zaG93TmV4dFNsaWRlKCQoJy5zbGlkZXJfX2Rpc3BsYXlfZmlyc3QnKSwgJ2Rvd24nKTtcclxuICAgICAgICAgICAgX3Nob3dOZXh0U2xpZGUoJCgnLnNsaWRlcl9fZGlzcGxheV9vcHBvc2l0ZScpLCAndXAnKTtcclxuICAgICAgICAgICAgc2xpZGVyQ2hhbmdlRmluaXNoZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICQud2hlbiAoYWN0aXZlUGljRmFkZUluLCBkZXNjQ29udGFpbmVyRmFkZUluLCBzbGlkZXJDaGFuZ2VGaW5pc2hlZCkuZG9uZSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3Nob3dOZXh0U2xpZGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICAgIHZhciBpbm5lckNvdW50ZXIgPSBjb3VudGVyLFxyXG4gICAgICAgICAgaXRlbXMgPSBjb250YWluZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgb2xkSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpO1xyXG5cclxuICAgICAgaWYgKGNvbnRhaW5lci5oYXNDbGFzcygnc2xpZGVyX19kaXNwbGF5X2ZpcnN0JykpIHtcclxuICAgICAgICAoaW5uZXJDb3VudGVyIC0gMSA8IDApID8gaW5uZXJDb3VudGVyID0gaXRlbXMubGVuZ3RoLTEgOiBpbm5lckNvdW50ZXItLSA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgKGlubmVyQ291bnRlciArIDEgPiBpdGVtcy5sZW5ndGgtMSkgPyBpbm5lckNvdW50ZXIgPSAwIDogaW5uZXJDb3VudGVyKysgO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbSA9IGl0ZW1zLmVxKGlubmVyQ291bnRlcik7XHJcblxyXG4gICAgICBfb25TbGlkZShuZXdJdGVtLCBvbGRJdGVtLCBkaXJlY3Rpb24pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9vblNsaWRlID0gZnVuY3Rpb24gKG5ld0l0ZW0sIG9sZEl0ZW0sIGRpcmVjdGlvbikge1xyXG5cclxuICAgICAgdmFyIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gPT0gJ2Rvd24nKT8gMTAwIDogLTEwMDtcclxuXHJcbiAgICAgIG5ld0l0ZW0uY3NzKCd0b3AnLCBkaXJlY3Rpb24qKC0xKSArICclJyk7XHJcbiAgICAgIG9sZEl0ZW0uYW5pbWF0ZSh7J3RvcCc6IGRpcmVjdGlvbiArJyUnfSwgZHVyYXRpb24pO1xyXG4gICAgICBuZXdJdGVtLmFuaW1hdGUoeyd0b3AnOiAnMCd9LCBkdXJhdGlvbiwgZnVuY3Rpb24oKXtcclxuICAgICAgICBuZXdJdGVtLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIG5ld0l0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIGRvd25BcnJvdyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNjcm9sbFRvID0gJCgnLnNlY3Rpb25fdG9fc2Nyb2xsJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkKCcuZG93bi1hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgIFxyXG4gICAgICAgIF9zY3JvbGxUb1NlY3Rpb24oKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2Nyb2xsVG9TZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgICB2YXIgcmVxUG9zID0gc2Nyb2xsVG8ub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxUG9zfSwgNTAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciB1cEFycm93ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQoJy51cC1hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgIFxyXG4gICAgICAgIF9zY3JvbGxUb1RvcCgpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zY3JvbGxUb1RvcCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA1MDApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIHdyaXRlTWUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBmb3JtID0gJCgnI3Jldmlld3NfX2Zvcm0nKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIF9jbGVhck1lc3NhZ2VzQW5kSW5wdXRTdHlsZXMoKTtcclxuICAgICAgICBfY29udGFjdE1lRm9ybUluaXRpYWxpemF0aW9uKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLnJldmlld3NfX2Zvcm0tYnV0dG9uLXJlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBmb3JtWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgX2NsZWFyTWVzc2FnZXNBbmRJbnB1dFN0eWxlcygpOyAgICAgICAgXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbGVhck1lc3NhZ2VzQW5kSW5wdXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICQoJy5yZXZpZXdzLWZvcm1fX21lc3NhZ2VzLWFsZXJ0Jykuc2xpZGVVcCgzMDApO1xyXG4gICAgICBmb3JtLmZpbmQoJy5yZXZpZXdzX19mb3JtLWVsZW1lbnQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0LWFsZXJ0Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jb250YWN0TWVGb3JtSW5pdGlhbGl6YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBmb3JtZGF0YSA9IGZvcm0uc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgIHNlbmROYW1lID0gJCgnI3NlbmROYW1lJykudmFsKCksXHJcbiAgICAgICAgICAgIHNlbmRFbWFpbCA9ICQoJyNzZW5kRW1haWwnKS52YWwoKSxcclxuICAgICAgICAgICAgc2VuZFRleHQgPSAkKCcjc2VuZFRleHQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKCFzZW5kTmFtZS50cmltKCkgfHwgIXNlbmRFbWFpbC50cmltKCkgfHwgIXNlbmRUZXh0LnRyaW0oKSkge1xyXG5cclxuICAgICAgICAgICAgJCgnI2VtcHR5RmllbGRzRGFuZ2VyJykuc2xpZGVEb3duKDMwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3BvcHVsYXRlQW5kSGlnaGxpZ2h0RW1wdHlJbnB1dHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHsgXHJcblxyXG4gICAgICAgICAgICAkKCcjb25DaGVja2luZycpLnNob3coJ2Zhc3QnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3BvcHVsYXRlQW5kSGlnaGxpZ2h0RW1wdHlJbnB1dHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBlbXB0eUlucHV0cyA9IFtdO1xyXG5cclxuICAgICAgJCgnI3Jldmlld3NfX2Zvcm0nKS5maW5kKCcucmV2aWV3c19fZm9ybS1lbGVtZW50JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLnZhbCgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICBlbXB0eUlucHV0cy5wdXNoKCQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhlbXB0eUlucHV0cyk7XHJcblxyXG4gICAgICBfaGlnaGxpZ2h0RW1wdHlJbnB1dHMoZW1wdHlJbnB1dHMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9oaWdobGlnaHRFbXB0eUlucHV0cyA9IGZ1bmN0aW9uKGVtcHR5SW5wdXRzKSB7XHJcblxyXG4gICAgICBlbXB0eUlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xyXG4gICAgICAgICAgJChlbnRyeSkuYWRkQ2xhc3MoJ2lucHV0LWFsZXJ0Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgLy/QstGB0YLQsNCy0LrQsCDQvtGC0YHRgtC40LvQuNC30L7QstCw0L3QvdC+0LkgR29vZ2xlTWFwXHJcbiAgdmFyIGluaXRNYXAgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIHN0eWxlQXJyYXk9W1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOid3YXRlcicsXHJcbiAgICAgICAgICBzdHlsZXJzOlt7Y29sb3I6JyMwMGJmYTUnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidsYW5kc2NhcGUnLFxyXG4gICAgICAgICAgZWxlbWVudFR5cGU6J2dlb21ldHJ5LmZpbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe2NvbG9yOicjZmZmZmZmJ31dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTonbGFuZHNjYXBlLm1hbl9tYWRlJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe3NhdHVyYXRpb246Jy03MCd9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmVhdHVyZVR5cGU6J2xhbmRzY2FwZS5uYXR1cmFsJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmVhdHVyZVR5cGU6J3BvaScsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonbGFiZWxzJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidwb2kucGFyaycsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidyb2FkJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe2xpZ2h0bmVzczonLTUnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOid0cmFuc2l0JyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidsYWJlbHMnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgICAgIH1cclxuICAgICAgXTtcclxuXHJcbiAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIGNlbnRlcjoge2xhdDogNTMuOTEyODM4LCBsbmc6IDI3LjU2NjQzMX0sXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIHN0eWxlczpzdHlsZUFycmF5LFxyXG4gICAgICAgIHpvb206IDE1LFxyXG4gICAgICAgIGRpc2FibGVEZWZhdWx0VUk6dHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjoge2xhdDogNTMuOTEwNjg0LCBsbmc6IDI3LjU1NjkyNH0sXHJcbiAgICAgICAgLy8g0KPQutCw0LfRi9Cy0LDQtdC8INC90LAg0LrQsNC60L7QuSDQutCw0YDRgtC1INC+0L0g0LTQvtC70LbQtdC9INC/0L7Rj9Cy0LjRgtGB0Y8uICjQndCwINGB0YLRgNCw0L3QuNGG0LUg0LLQtdC00Ywg0LzQvtC20LXRgiDQsdGL0YLRjCDQsdC+0LvRjNGI0LUg0L7QtNC90L7QuSDQutCw0YDRgtGLKVxyXG4gICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgIC8vINCf0LjRiNC10Lwg0L3QsNC30LLQsNC90LjQtSDQvNCw0YDQutC10YDQsCAtINC/0L7Rj9Cy0LjRgtGB0Y8g0LXRgdC70Lgg0L3QsNCy0LXRgdGC0Lgg0L3QsCDQvdC10LPQviDQutGD0YDRgdC+0YAg0Lgg0L3QtdC80L3QvtCz0L4g0L/QvtC00L7QttC00LDRgtGMXHJcbiAgICAgICAgdGl0bGU6ICfQnNC+0LUg0LzQtdGB0YLQvtC90LDRhdC+0LbQtNC10L3QuNC1JyxcclxuICAgICAgICAvLyDQo9C60LDQttC10Lwg0YHQstC+0Y4g0LjQutC+0L3QutGDINC00LvRjyDQvNCw0YDQutC10YDQsFxyXG4gICAgICAgIGljb246ICdhc3NldHMvaW1nL21hcF9tYXJrZXJfbGFyZ2UucG5nJ1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy/QstGL0LfRi9Cy0LDQtdC8INC/0YDQuCDRg9GB0LvQvtCy0LjQuFxyXG4gICAgaWYoJCgnLnBhcmFsbGF4JykubGVuZ3RoKXtcclxuICAgICAgbXlNb3VzZVBhcmFsbGF4LmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcuZnVsbHNjcmVlbi1tZW51JykubGVuZ3RoKXtcclxuICAgICAgYnVyZ2VyTWVudS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLmJsdXInKS5sZW5ndGgpe1xyXG4gICAgICBibHVyRm9ybS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLm5hdi1ibG9nJykubGVuZ3RoKXtcclxuICAgICAgc2lkZUJhckJsb2cuaW5pdCgpO1xyXG4gICAgICBzaWRlQmFyTmF2aWdhdGlvbi5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcucHJlbG9hZGVyJykubGVuZ3RoKXtcclxuICAgICAgcHJlbG9hZGVyLmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy5mbGlwcGVyJykubGVuZ3RoKXtcclxuICAgICAgZmxpcHBlci5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcuc2xpZGVyJykubGVuZ3RoKXtcclxuICAgICAgc2xpZGVyLmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy5kb3duLWFycm93JykubGVuZ3RoKXtcclxuICAgICAgZG93bkFycm93LmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy51cC1hcnJvdycpLmxlbmd0aCl7XHJcbiAgICAgIHVwQXJyb3cuaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLndyaXRlLW1lJykubGVuZ3RoKXtcclxuICAgICAgd3JpdGVNZS5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcubWFwJykubGVuZ3RoKXtcclxuICAgICAgaW5pdE1hcC5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG59KSgpOyJdfQ==
