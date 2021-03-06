(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    var myMouseParallax = function () {
        var layer = $('.parallax').find('.parallax__layer');

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $(window).on('mousemove', _moveLayers);
        };

        var _moveLayers = function _moveLayers(e) {
            var mouseX = e.pageX,
                mouseY = e.pageY,
                w = window.innerWidth / 2 - mouseX,
                h = window.innerHeight / 2 - mouseY;

            layer.map(function (key, value) {
                var bottomPosition = window.innerHeight / 2 * (key / 100),
                    widthPosition = w * (key / 100),
                    heightPosition = h * (key / 100);

                $(value).css({
                    'bottom': '-' + bottomPosition + 'px',
                    'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
                });
            });
        };

        return {
            init: init
        };
    }();

    var burgerMenu = function () {

        var menu = $('.fullscreen-menu'),
            menuSections = $('.fullscreen-menu__section'),
            list = $('.fullscreen-menu__list'),
            inProcess = false;

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $('.burger-menu__link').on('click', _openMenu);
        };

        var _openMenu = function _openMenu(e) {

            e.preventDefault();

            if (!inProcess) {

                inProcess = true;

                if ($(this).hasClass('active')) {

                    $(this).removeClass('active');
                    $('body').css('position', 'static');
                    list.removeClass('active');
                    menuSections.removeClass('active');
                    setTimeout(function () {
                        menu.removeClass('active');
                        inProcess = false;
                    }, 500);
                } else {

                    $(this).addClass('active');
                    $('body').css('position', 'fixed');
                    menu.addClass('active');
                    menuSections.addClass('active');
                    list.addClass('active');
                    setTimeout(function () {
                        inProcess = false;
                    }, 1100);
                }
            }
        };

        return {

            init: init

        };
    }();

    var blurForm = function () {

        var wrapper = $('.write-me__blur-wrapper'),
            wrapperTop = $('.write-me'),
            form = $('.write-me__blur');

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $(window).on('resize', _setBlur);
            $(document).ready(_setBlur);
        };

        var _setBlur = function _setBlur() {

            var imgWidth = $('.reviews__background').width(),
                posLeft = -wrapper.position().left,
                posTop = -wrapperTop.position().top;

            form.css({
                'background-size': imgWidth + 'px' + ' ' + 'auto',
                'backgroundPosition': posLeft + 'px' + ' ' + posTop + 'px'
            });
        };

        return {

            init: init

        };
    }();

    var sideBarBlog = function () {

        var sideBar = $('.nav-blog');

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $('.nav-blog__toggle-link').on('click', _openSideBar);
            $(document).on('click', _closeSideBar);
        };

        var _openSideBar = function _openSideBar(e) {

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

        var _closeSideBar = function _closeSideBar(e) {

            var $this = $(e.target);

            if (!$this.closest(sideBar).length) {
                $('.nav-blog__toggle-link').removeClass('active');
                sideBar.removeClass('active');
            }
        };

        return {

            init: init

        };
    }();

    var sideBarNavigation = function () {

        var sideBar = $('.nav-blog');
        var sideBarList = $('.nav-blog__list');
        var sideBarWrapper = sideBar.closest('.container');
        var contentBarItem = sideBarWrapper.find('.content-blog__item');
        var sideBarItem = sideBarList.find('.nav-blog__link');

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {

            $(window).scroll(_checkSection);
            $(document).ready(function () {

                sideBarItem.on('click', function (e) {
                    e.preventDefault();
                    _showSection($(this).attr('href'), true);
                });

                _showSection(window.location.hash, false);
            });
            $(window).scroll(_SideBarFixed);
            $(window).on('resize scroll', _SideBarWidthFixed);
        };

        var _checkSection = function _checkSection() {

            contentBarItem.each(function () {
                var $this = $(this),
                    topEdge = $this.offset().top - 150,
                    bottomEdge = topEdge + $this.height(),
                    wScroll = $(window).scrollTop();

                if (topEdge <= wScroll && bottomEdge >= wScroll) {

                    var currentId = $this.data('section');
                    var reqLink = sideBarItem.filter('[href="#' + currentId + '"]');

                    reqLink.closest('.nav-blog__item').addClass('active').siblings().removeClass('active');
                    sideBar.removeClass('active');
                    $('.nav-blog__toggle-link').removeClass('active');

                    window.location.hash = currentId;
                }
            });
        };

        function _showSection(section, isAnimate) {

            var direction = section.replace(/#/, '');
            var reqSection = contentBarItem.filter('[data-section="' + direction + '"]');
            var reqSectionPos = reqSection.offset().top;

            if (isAnimate) {
                $('body, html').animate({ scrollTop: reqSectionPos }, 500);
            } else {
                $('body, html').scrollTop(reqSectionPos);
            }
        };

        var _SideBarFixed = function _SideBarFixed() {

            var topEdge = sideBarWrapper.offset().top - 30,
                leftEdge = sideBarList.position().left,
                wScroll = $(document).scrollTop();

            if (topEdge <= wScroll) {

                sideBar.addClass('fixed');
            } else {

                sideBar.removeClass('fixed');
            }
        };

        var _SideBarWidthFixed = function _SideBarWidthFixed() {

            var OSName = "Unknown OS";
            if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

            var sideBarWidth = $(window).width() >= 1500 ? (1500 - 40) * 0.3 + 'px' : OSName == "MacOS" && $(window).width() <= 768 ? $(window).width() * 0.6 + 'px' : OSName != "MacOS" && $(window).width() <= 768 - 17 ? $(window).width() * 0.6 + 'px' : ($(window).width() - 40) * 0.3 + 'px';

            sideBar.css('width', sideBarWidth);
        };

        return {

            init: init

        };
    }();

    var flipper = function () {

        var flipperContainer = $('.flipper');
        var authorizationLink = $('.authorization__link');
        var toMain = $('.authorization__form-button_back');

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            authorizationLink.on('click', _flipperStart);
            $(document).on('click', _flipperEnd);
            toMain.on('click', _toMain);
        };

        var _flipperStart = function _flipperStart(e) {

            var $this = $(this);
            e.preventDefault();
            flipperContainer.addClass('active');
            $this.fadeOut(1000);
        };

        var _flipperEnd = function _flipperEnd(e) {

            var $this = $(e.target);

            if (!$this.closest(flipperContainer).length && !$this.closest('.authorization').length) {
                flipperContainer.removeClass('active');
                authorizationLink.fadeIn(1000);
            }
        };

        var _toMain = function _toMain(e) {

            var $this = $(this);

            e.preventDefault();
            flipperContainer.removeClass('active');
            authorizationLink.fadeIn(1000);
        };

        return {

            init: init

        };
    }();

    var preloader = function () {

        var preloader = $('.preloader');
        var percentsTotal = 0;

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $(document).ready(_preloaderStart);
        };

        var _preloaderStart = function _preloaderStart() {
            var myImages = imgPath.toArray();

            loadImages(myImages);
        };

        var imgPath = $('*').map(function (index, elem) {

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

        var setPercents = function setPercents(total, current) {

            var percents = Math.ceil(current / total * 100);

            $('.preloader__percents').text(percents + '%');

            if (percents >= 100) {
                setTimeout(function () {
                    preloader.fadeOut();
                    preloader.addClass('done');
                }, 500);
            }
        };

        var loadImages = function loadImages(images) {
            if (!images.length) {
                preloader.fadeOut();
                preloader.addClass('done');
            }

            images.forEach(function (element, index) {
                var fakeImage = $('<img>', {
                    attr: {
                        src: element
                    }

                });

                fakeImage.on('load error', function () {

                    percentsTotal++;
                    setPercents(images.length, percentsTotal);
                });
            });
        };

        return {

            init: init

        };
    }();

    var slider = function () {

        var counter = 1,
            duration = 500,
            inProcess = false;

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
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

                    if (counter > items.length - 1) {
                        counter = 0;
                    }

                    if (counter < 0) {
                        counter = items.length - 1;
                    }

                    var mainSrc = items.eq(counter).find('img').attr('src');

                    var activePicFadeOut = $.Deferred(),
                        activePicLoaded = $.Deferred(),
                        activePicFadeIn = $.Deferred(),
                        descContainerFadeOut = $.Deferred(),
                        descContainerChanged = $.Deferred(),
                        descContainerFadeIn = $.Deferred(),
                        sliderChangeFinished = $.Deferred();

                    $('.slider__active-pic').fadeOut(250, function () {
                        activePicFadeOut.resolve();
                    });

                    activePicFadeOut.done(function () {
                        $('.slider__active-pic').attr('src', mainSrc).on('load', function () {
                            activePicLoaded.resolve();
                        });
                    });

                    activePicLoaded.done(function () {
                        $('.slider__active-pic').fadeIn(250, function () {
                            activePicFadeIn.resolve();
                        });
                    });

                    itemsDescriptionContainer.fadeOut(220, function () {
                        descContainerFadeOut.resolve();
                    });

                    descContainerFadeOut.done(function () {
                        itemsDescription.filter('.active').removeClass('active');
                        itemsDescription.eq(counter).addClass('active');
                        descContainerChanged.resolve();
                    });

                    descContainerChanged.done(function () {
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

                    $.when(activePicFadeIn, descContainerFadeIn, sliderChangeFinished).done(function () {
                        inProcess = false;
                    });
                }
            });
        };

        var _showNextSlide = function _showNextSlide(container, direction) {

            var innerCounter = counter,
                items = container.find('.slider__item'),
                oldItem = items.filter('.active');

            if (container.hasClass('slider__display_first')) {
                innerCounter - 1 < 0 ? innerCounter = items.length - 1 : innerCounter--;
            } else {
                innerCounter + 1 > items.length - 1 ? innerCounter = 0 : innerCounter++;
            }

            var newItem = items.eq(innerCounter);

            _onSlide(newItem, oldItem, direction);
        };

        var _onSlide = function _onSlide(newItem, oldItem, direction) {

            var direction = direction == 'down' ? 100 : -100;

            newItem.css('top', direction * -1 + '%');
            oldItem.animate({ 'top': direction + '%' }, duration);
            newItem.animate({ 'top': '0' }, duration, function () {
                newItem.siblings().removeClass('active');
                newItem.addClass('active');
            });
        };

        return {

            init: init

        };
    }();

    var downArrow = function () {

        var scrollTo = $('.section_to_scroll');

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {

            $('.down-arrow').on('click', function (e) {
                e.preventDefault();
                _scrollToSection();
            });
        };

        var _scrollToSection = function _scrollToSection() {

            var reqPos = scrollTo.offset().top;

            $('body, html').animate({ scrollTop: reqPos }, 500);
        };

        return {

            init: init

        };
    }();

    var upArrow = function () {

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {

            $('.up-arrow').on('click', function (e) {
                e.preventDefault();
                _scrollToTop();
            });
        };

        var _scrollToTop = function _scrollToTop() {

            $('body, html').animate({ scrollTop: 0 }, 500);
        };

        return {

            init: init

        };
    }();

    var myScrollParallax = function () {

        var portfolio = $('.header').find('.header__title-img'),
            bg = $('.header').find('.header__bg'),
            user = $('.header').find('.user_position_header');

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $(window).on('scroll', _moveLayers);
        };

        var _moveLayers = function _moveLayers(wScroll) {
            var wScroll = $(window).scrollTop();
            _move(bg, wScroll, 30);
            _move(portfolio, wScroll, 7);
            _move(user, wScroll, -6);
        };

        var _move = function _move(block, windowScroll, strafeAmount) {

            var strafe = windowScroll / strafeAmount * -1 + '%',
                transformString = 'translate3d(0,' + strafe + ',0)';

            block.css({
                'transform': transformString,
                '-webkit-transform': transformString
            });
        };

        return {

            init: init

        };
    }();

    var animateSkills = function () {

        var items = $('.skill'),
            counter = 0,
            timer;

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $(window).on('scroll', _startAnimation);
            $(document).ready(_startChecking);
        };

        var _startChecking = function _startChecking() {
            if ($('.preloader').hasClass('done')) {
                _startAnimation;
            }
        };

        var _startAnimation = function _startAnimation() {

            if ($(window).height() >= $('.skills').offset().top + $('.skills').height() || $('.skills').offset().top - $(window).scrollTop() + $('.skills').height() / 2 - Math.ceil($(window).height() / ($('body').height() / $(window).height())) < 0) {
                _animate();
            }
        };

        var _animate = function _animate() {
            var item = items.eq(counter);

            item.addClass('active');
            counter++;

            timer = setTimeout(_animate, 300);

            if (counter == items.length) {
                if (timer) clearTimeout(timer);
            }
        };

        return {

            init: init

        };
    }();

    var tabs = function () {

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            $(document).ready(function () {
                $('.tabs__controls-link').on('click', _tabsChanging);
            });
        };

        var _tabsChanging = function _tabsChanging(e) {
            e.preventDefault();
            var item = $(this).closest('.tabs__controls-item');
            var contentItem = $('.tabs__item');
            var position = item.index();

            contentItem.eq(position).addClass('tabs__item_active').siblings().removeClass('tabs__item_active');
            item.addClass('tabs__controls-item_active').siblings().removeClass('tabs__controls-item_active');
        };

        return {

            init: init

        };
    }();

    var addedBlog = function () {
        var formBlog = document.querySelector('#blog'),
            form = $('#blog'),
            alert = $('.status');

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            formBlog.addEventListener('submit', function (e) {
                e.preventDefault();
                _clearMessagesAndInputStyles();
                _prepareSendPost();
            });

            $('.form__btn-reset').on('click', function (e) {
                e.preventDefault();
                form[0].reset();
                alert.text('');
                _clearMessagesAndInputStyles();
            });
        };

        var _clearMessagesAndInputStyles = function _clearMessagesAndInputStyles() {

            form.find('.form__input_needed').each(function () {
                $(this).removeClass('input-alert');
            });
        };

        var _prepareSendPost = function _prepareSendPost() {
            var data = {
                title: formBlog.title.value.trim(),
                date: formBlog.date.value.trim(),
                text: formBlog.text.value.trim()
            };

            if (!data.title || !data.date || !data.text) {
                _populateAndHighlightEmptyInputs();
            } else {
                _clearFormInputs();
            }

            (0, _prepareSend2.default)('/addpost', formBlog, data);
        };

        var _populateAndHighlightEmptyInputs = function _populateAndHighlightEmptyInputs() {

            var emptyInputs = [];

            form.find('.form__input_needed').each(function () {
                if (!$(this).val().trim()) {
                    emptyInputs.push($(this));
                }
            });

            _highlightEmptyInputs(emptyInputs);
        };

        var _highlightEmptyInputs = function _highlightEmptyInputs(emptyInputs) {

            emptyInputs.forEach(function (entry) {
                $(entry).addClass('input-alert');
            });
        };

        var _clearFormInputs = function _clearFormInputs() {
            form.each(function () {
                this.reset();
            });
        };

        return {
            init: init
        };
    }();

    var writeMe = function () {

        var formMail = document.querySelector('#reviews__form'),
            form = $('#reviews__form'),
            alert = $('.status');

        var init = function init() {

            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            formMail.addEventListener('submit', function (e) {
                e.preventDefault();
                _clearMessagesAndInputStyles();
                _prepareSendMail();
            });

            $('.reviews__form-button-reset').on('click', function (e) {
                e.preventDefault();
                form[0].reset();
                alert.text('');
                _clearMessagesAndInputStyles();
            });
        };

        var _clearMessagesAndInputStyles = function _clearMessagesAndInputStyles() {

            form.find('.reviews__form-element').each(function () {
                $(this).removeClass('input-alert');
            });
        };

        var _prepareSendMail = function _prepareSendMail() {
            var data = {
                name: formMail.name.value.trim(),
                email: formMail.email.value.trim(),
                text: formMail.text.value.trim()
            };

            alert.text('');

            if (!data.name || !data.email || !data.text) {
                _populateAndHighlightEmptyInputs();
                alert.text('Пожалуйста, заполните все поля в форме');
            } else {
                alert.text('Ваше сообщение успешно отправлено');
                _clearFormInputs();
                //prepareSend('/works', formMail, data);
            }
        };

        var _populateAndHighlightEmptyInputs = function _populateAndHighlightEmptyInputs() {

            var emptyInputs = [];

            form.find('.reviews__form-element').each(function () {
                if (!$(this).val().trim()) {
                    emptyInputs.push($(this));
                }
            });

            _highlightEmptyInputs(emptyInputs);
        };

        var _highlightEmptyInputs = function _highlightEmptyInputs(emptyInputs) {

            emptyInputs.forEach(function (entry) {
                $(entry).addClass('input-alert');
            });
        };

        var _clearFormInputs = function _clearFormInputs() {
            form.each(function () {
                this.reset();
            });
        };

        return {

            init: init

        };
    }();

    var addedPic = function () {
        var formUpload = document.querySelector('#upload'),
            form = $('#upload'),
            alert = form.find($('.status'));

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            formUpload.addEventListener('submit', function (e) {
                e.preventDefault();
                _clearMessagesAndInputStyles();
                _prepareSendFile();
            });
        };

        var _clearMessagesAndInputStyles = function _clearMessagesAndInputStyles() {

            form.find('.form__input_admin_pic').each(function () {
                $(this).removeClass('input-alert');
            });
        };

        var _prepareSendFile = function _prepareSendFile() {
            alert.text('');
            var resultContainer = formUpload.querySelector('.status');
            var formData = new FormData();
            var file = document.querySelector('#file-select').files[0];
            var name = document.querySelector('#file-desc').value.trim();
            var technics = document.querySelector('#file-technics').value.trim();

            if (!name || !technics) {
                _populateAndHighlightEmptyInputs();
                alert.text('Не указано описание проекта');
            } else {
                _clearFormInputs();
                formData.append('photo', file, file.name);
                formData.append('name', name);
                formData.append('technics', technics);

                resultContainer.innerHTML = 'Uploading...';
                (0, _upload2.default)('/slider', formData, function (data) {
                    resultContainer.innerHTML = data;
                    formUpload.reset();
                });
            }
        };

        var _populateAndHighlightEmptyInputs = function _populateAndHighlightEmptyInputs() {

            var emptyInputs = [];

            form.find('.form__input_admin_pic').each(function () {
                if (!$(this).val().trim()) {
                    emptyInputs.push($(this));
                }
            });

            _highlightEmptyInputs(emptyInputs);
        };

        var _highlightEmptyInputs = function _highlightEmptyInputs(emptyInputs) {

            emptyInputs.forEach(function (entry) {
                $(entry).addClass('input-alert');
            });
        };

        var _clearFormInputs = function _clearFormInputs() {
            form.each(function () {
                this.reset();
            });
        };

        return {
            init: init
        };
    }();

    var makeAuthorization = function () {
        var formLogin = document.querySelector('#login');
        var alert = $('.status'),
            form = $('#login');

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            formLogin.addEventListener('submit', function (e) {
                e.preventDefault();
                _prepareSendLogin();
            });
        };

        var _prepareSendLogin = function _prepareSendLogin() {

            var data = {
                login: formLogin.user.value,
                password: formLogin.password.value
            };
            alert.text('');

            if (!data.login || !data.password) {
                _populateAndHighlightEmptyInputs();
                alert.text('Введите логин и пароль!');
            } else {
                _clearMessagesAndInputStyles();
                if ($('.authorization__form-checkbox').prop('checked') && $(":radio[name=answer]").filter(":checked").val() == "yes") {
                    _clearFormInputs();
                    (0, _prepareSend2.default)('/login', formLogin, data, function (data) {
                        if (data === 'Авторизация успешна!') {
                            location.href = '/admin';
                        }
                    });
                } else {
                    alert.text('Не людям тут не место');
                }
            }
        };

        var _populateAndHighlightEmptyInputs = function _populateAndHighlightEmptyInputs() {

            var emptyInputs = [];

            form.find('.authorization__form-element').each(function () {
                if (!$(this).val().trim()) {
                    emptyInputs.push($(this));
                }
            });

            _highlightEmptyInputs(emptyInputs);
        };

        var _highlightEmptyInputs = function _highlightEmptyInputs(emptyInputs) {

            emptyInputs.forEach(function (entry) {
                $(entry).addClass('input-alert');
            });
        };

        var _clearMessagesAndInputStyles = function _clearMessagesAndInputStyles() {

            form.find('.authorization__form-element').each(function () {
                $(this).removeClass('input-alert');
            });
        };

        var _clearFormInputs = function _clearFormInputs() {
            form.each(function () {
                this.reset();
            });
        };

        return {
            init: init
        };
    }();

    var updateSkills = function () {
        var formSkills = document.querySelector('#skills');

        var init = function init() {
            _setUpListeners();
        };

        var _setUpListeners = function _setUpListeners() {
            formSkills.addEventListener('submit', function (e) {
                e.preventDefault();
                _prepareSendSkills();
            });
        };

        var _prepareSendSkills = function _prepareSendSkills() {
            var data = {};
            var itemsElement = document.querySelectorAll('.form-skill-section__title');

            for (var i = 0; i < itemsElement.length; i++) {
                var inputs = itemsElement[i].parentNode.querySelectorAll('input');
                data[itemsElement[i].textContent] = [];

                for (var input = 0; input < inputs.length; input++) {
                    var a = inputs[input].name;
                    var b = inputs[input].value;
                    data[itemsElement[i].textContent].push({ name: a, value: b });
                }
            }
            /*itemsElement.forEach(function (i) {
                var inputs = i.parentNode.querySelectorAll('input');
                data[i.textContent] = [];
                inputs.forEach(function (input) {
                    data[i.textContent].push({ name: input.name, value: input.value });
                });
            });*/

            (0, _prepareSend2.default)('/addskills', formSkills, data);
        };

        return {
            init: init
        };
    }();

    //вставка отстилизованной GoogleMap
    var initMap = function () {

        var init = function init() {

            var styleArray = [{
                featureType: 'water',
                stylers: [{ color: '#00bfa5' }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry.fill',
                stylers: [{ color: '#ffffff' }]
            }, {
                featureType: 'landscape.man_made',
                elementType: 'all',
                stylers: [{ saturation: '-70' }]
            }, {
                featureType: 'landscape.natural',
                elementType: 'all',
                stylers: [{ visibility: 'off' }]
            }, {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }, {
                featureType: 'poi.park',
                elementType: 'all',
                stylers: [{ visibility: 'off' }]
            }, {
                featureType: 'road',
                elementType: 'all',
                stylers: [{ lightness: '-5' }]
            }, {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }];

            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 53.912838, lng: 27.566431 },
                scrollwheel: false,
                styles: styleArray,
                zoom: 15,
                disableDefaultUI: true
            });

            var marker = new google.maps.Marker({
                position: { lat: 53.910684, lng: 27.556924 },
                // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
                map: map,
                // Пишем название маркера - появится если навести на него курсор и немного подождать
                title: 'Мое местонахождение',
                // Укажем свою иконку для маркера
                icon: 'assets/img/map_marker_large.png'
            });
        };

        return {

            init: init

        };
    }();

    $(document).ready(function () {

        //вызываем при условии
        if ($('.parallax').length) {
            myMouseParallax.init();
        }

        if ($('.fullscreen-menu').length) {
            burgerMenu.init();
        }

        if ($('.blur').length) {
            blurForm.init();
        }

        if ($('.nav-blog').length) {
            sideBarBlog.init();
            sideBarNavigation.init();
        }

        if ($('.preloader').length) {
            preloader.init();
        }

        if ($('.flipper').length) {
            flipper.init();
        }

        if ($('.slider').length) {
            slider.init();
        }

        if ($('.down-arrow').length) {
            downArrow.init();
        }

        if ($('.up-arrow').length) {
            upArrow.init();
        }

        if ($('.map').length) {
            initMap.init();
        }

        if ($('.pages__container').length) {
            myScrollParallax.init();
        }

        if ($('.skills').length) {
            animateSkills.init();
        }

        if ($('.tabs').length) {
            tabs.init();
        }

        if ($('#blog').length) {
            addedBlog.init();
        }

        if ($('.write-me').length) {
            writeMe.init();
        }

        if ($('#upload').length) {
            addedPic.init();
        }

        if ($('#login').length) {
            makeAuthorization.init();
        }

        if ($('#skills').length) {
            updateSkills.init();
        }
    });
})();

},{"./prepareSend":2,"./upload":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareSend;

var _sendAjax = require('./sendAjax');

var _sendAjax2 = _interopRequireDefault(_sendAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareSend(url, form, data, cb) {
  var resultContainer = form.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  (0, _sendAjax2.default)(url, data, function (data) {
    resultContainer.innerHTML = data;
    if (cb) {
      cb(data);
    }
  });
}

},{"./sendAjax":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = void 0;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb('Извините в данных ошибка');
    }
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };

  xhr.send(data);
};

},{}]},{},[1])

//# sourceMappingURL=maps/app.js.map
