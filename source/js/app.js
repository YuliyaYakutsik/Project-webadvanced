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

      $('.reviews-form__messages-element').slideUp(300);
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

            $.ajax({
                url: 'assets/php/mail.php',
                type: 'POST',
                data: formdata,
                success: function(data) {
                    var popup = data.status ? '#success' : '#error';

                    $('#onChecking').hide('fast'); 
                    $(popup).slideDown('fast', function() {
                      _clearFormInputs();
                    });
                }
            });

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

    var _clearFormInputs = function() {
      form.each(function () {
        this.reset();
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