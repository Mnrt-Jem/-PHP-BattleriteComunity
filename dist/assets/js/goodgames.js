/*!-----------------------------------------------------------------
  Name: GoodGames - Game Portal / Store HTML Template
  Version: 1.0.0
  Author: _nK
  Website: https://nkdev.info
  Purchase: https://nkdev.info
  Support: https://nk.ticksy.com
  License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
  Copyright 2016.
-------------------------------------------------------------------*/
;(function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    scrollToAnchorSpeed: 700,

    templates: {
        secondaryNavbarBackItem: 'Back',

        plainVideoIcon: '<span class="nk-video-icon"><span class="fa fa-play pl-5"></span></span>',
        plainVideoLoadIcon: '<span class="nk-video-icon"><span class="nk-loading-icon"></span></span>',

        audioPlainButton: '<div class="nk-audio-plain-play-pause">\n                <span class="nk-audio-plain-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-plain-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',

        instagram: '<div class="col-xs-4">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fa fa-twitter"></span>\n                <div class="nk-twitter-name">\n                      <a href="https://twitter.com/{{screen_name}}" target="_blank">@{{screen_name}}</a>\n                </div>\n                <div class="nk-twitter-date">\n                    <span>{{date}}</span>\n                </div>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown: '<div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%D</span>\n                Days\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%H</span>\n                Hours\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%M</span>\n                Minutes\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%S</span>\n                Seconds\n            </div>'
    }
};

/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.TweenMax;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;
function getWndSize() {
    wndW = $wnd.width();
    wndH = $wnd.height();
    docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout = void 0;
$wnd.on('load resize orientationchange', function (e) {
    if (resizeArr.length) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            for (var k = 0; k < resizeArr.length; k++) {
                resizeArr[k](e);
            }
        }, 50);
    }
});
function _debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * page border size
 */
var $page_border = $('.nk-page-border .nk-page-border-t');
var pageBorderSize = $page_border.height();
_debounceResize(function () {
    pageBorderSize = $page_border.height();
});

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
var hideOnScrollList = [];
var didScroll = void 0;
var lastST = 0;

$wnd.on('scroll load resize orientationchange', function () {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    var ST = $wnd.scrollTop();

    var type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    for (var k in hideOnScrollList) {
        if (typeof hideOnScrollList[k] === 'function') {
            hideOnScrollList[k](type, ST, lastST, $wnd);
        }
    }

    lastST = ST;
}

setInterval(function () {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function _throttleScroll(callback) {
    hideOnScrollList.push(callback);
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
var bodyOverflowEnabled = void 0;
var isBodyOverflowing = void 0;
var scrollbarWidth = void 0;
var originalBodyPadding = void 0;
var $headerContent = $('.nk-header > *');
function bodyGetScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'nk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body.css('padding-right') || '';
    }

    if (isBodyOverflowing) {
        $body.add($headerContent).css('paddingRight', scrollbarWidth + 'px');
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $headerContent.css('paddingRight', '');
}
function _bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function _isInViewport($item, returnRect) {
    var rect = $item[0].getBoundingClientRect();
    var result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        var beforeTopEnd = Math.max(0, rect.height + rect.top);
        var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        var afterTop = Math.max(0, -rect.top);
        var beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else {
            if (beforeTopEnd <= wndH) {
                result = beforeTopEnd / wndH;
            } else if (beforeBottomEnd <= wndH) {
                result = beforeBottomEnd / wndH;
            }
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}

/**
 * Scroll To
 */
function _scrollTo($to, callback) {
    var scrollPos = false;
    var speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, speed, {
            scrollTo: {
                y: scrollPos,
                autoKill: true
            },
            ease: Power2.easeOut,
            autoKill: true,
            overwrite: 5
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function _setOptions(newOpts) {
    var self = this;

    var optsTemplates = $.extend({}, this.options.templates, newOpts && newOpts.templates || {});
    var optsShortcuts = $.extend({}, this.options.shortcuts, newOpts && newOpts.shortcuts || {});
    var optsEvents = $.extend({}, this.options.events, newOpts && newOpts.events || {});

    self.options = $.extend({}, self.options, newOpts);
    self.options.templates = optsTemplates;
    self.options.shortcuts = optsShortcuts;
    self.options.events = optsEvents;
}

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function _initNavbar() {
    var self = this;
    var $navbarTop = $('.nk-navbar-top');

    // add mobile navbar
    var $mobileNavItems = $('[data-nav-mobile]');
    if ($mobileNavItems.length) {
        (function () {
            var $mobileNav = void 0;
            var $nav = void 0;

            $mobileNavItems.each(function () {
                $mobileNav = $($(this).attr('data-nav-mobile'));
                if ($nav) {
                    $nav = $nav.add($(this).html());
                } else {
                    $nav = $($(this).html());
                }
            });

            // insert into mobile nav
            $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav').html($nav);

            $nav = $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav');

            // remove background images
            $nav.find('.bg-image, .bg-video').remove();

            // remove mega menus
            $nav.find('.nk-mega-item > .dropdown').each(function () {
                var $drop = $(this).children('ul').addClass('dropdown');

                // fix mega menu columns
                $drop.find('> li > label').each(function () {
                    $(this).next().addClass('dropdown');
                    $(this).parent().addClass('nk-drop-item');
                    $(this).replaceWith($('<a href="#"></a>').html($(this).html()));
                });

                $(this).replaceWith($drop);
            });
            $nav.find('.nk-mega-item').removeClass('nk-mega-item');
        })();
    }

    // sticky navbar
    var navbarTop = $navbarTop.length ? $navbarTop.offset().top - pageBorderSize : 0;
    // fake hidden navbar to prevent page jumping on stick
    var $navbarFake = $('<div>').hide();
    function onScrollNav() {
        var stickyOn = $wnd.scrollTop() >= navbarTop;

        if (stickyOn) {
            $navbarTop.addClass('nk-navbar-fixed');
            $navbarFake.show();
        } else {
            $navbarTop.removeClass('nk-navbar-fixed');
            $navbarFake.hide();
        }
    }
    if ($navbarTop.hasClass('nk-navbar-sticky')) {
        $wnd.on('scroll resize', onScrollNav);
        onScrollNav();

        $navbarTop.after($navbarFake);
        self.debounceResize(function () {
            $navbarFake.height($navbarTop.innerHeight());
        });
    }

    // correct dropdown position
    function correctDropdown($item) {
        if ($item.parent().is('.nk-nav')) {
            var $dropdown = $item.children('.dropdown');
            var $parent = $item.parents('.nk-navbar:eq(0)');
            var isRight = $dropdown.css('right') !== 'auto';
            var css = {
                marginLeft: '',
                marginRight: '',
                marginTop: 0,
                display: 'block'
            };

            $dropdown.css(css);

            var rect = $dropdown[0].getBoundingClientRect();
            var itemRect = $item[0].getBoundingClientRect();

            // move dropdown from left corner
            if (rect.left - pageBorderSize < 0) {
                css.marginLeft = pageBorderSize - rect.left;
            }

            // move dropdown from right corner
            else if (rect.right > wndW - pageBorderSize * 2) {
                    css.marginLeft = wndW - pageBorderSize - rect.right;
                }

            // check if dropdown not under item
            var currentLeftPost = rect.left + (css.marginLeft || 0);
            if (currentLeftPost > itemRect.left) {
                css.marginLeft = (css.marginLeft || 0) - (currentLeftPost - itemRect.left);
            }

            // change to margin-right. In some cases left margin isn't working, for ex. in mega menu
            if (isRight) {
                css.marginRight = -1 * css.marginLeft;
                css.marginLeft = '';
            }

            // correct top position
            css.marginTop = $parent.innerHeight() - $dropdown.offset().top + $parent.offset().top;

            // additional 5px offset
            css.marginTop += 5;

            // hide menu
            css.display = 'none';

            $dropdown.css(css);
        }
    }

    // toggle dropdown
    function closeSubmenu($item) {
        if ($item.length) {
            $item.removeClass('open');
            tween.to($item.children('.dropdown'), 0.3, {
                opacity: 0,
                display: 'none'
            });
            $wnd.trigger('nk-closed-submenu', [$item]);
        }
    }
    function openSubmenu($item) {
        if (!$item.hasClass('open')) {
            correctDropdown($item);
            tween.to($item.children('.dropdown'), 0.3, {
                opacity: 1,
                display: 'block'
            });
            $item.addClass('open');
            $wnd.trigger('nk-opened-submenu', [$item]);
        }
    }
    var dropdownTimeout = void 0;
    $navbarTop.on('mouseenter', 'li.nk-drop-item', function () {
        var $item = $(this);
        var $openedSiblings = $item.siblings('.open').add($item.siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings('.open')).add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    }).on('mouseleave', 'li.nk-drop-item', function () {
        var $item = $(this);
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($item);
        }, 200);
    });
    $navbarTop.on('mouseleave', function () {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($navbarTop.find('.open'));
        }, 400);
    });

    // hide / show
    // add / remove solid color
    var $autohide_nav = $navbarTop.filter('.nk-navbar-autohide');
    self.throttleScroll(function (type, scroll) {
        var start = 400;
        var hideClass = 'nk-onscroll-hide';
        var showClass = 'nk-onscroll-show';

        // hide / show
        if (type === 'down' && scroll > start) {
            $autohide_nav.removeClass(showClass).addClass(hideClass);
        } else if (type === 'up' || type === 'end' || type === 'start') {
            $autohide_nav.removeClass(hideClass).addClass(showClass);
        }

        // add solid color
        if ($navbarTop.hasClass('nk-navbar-transparent')) {
            $navbarTop[(scroll > 70 ? 'add' : 'remove') + 'Class']('nk-navbar-solid');
        }
    });
}

/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/
function _initNavbarSide() {
    var self = this;
    var $overlay = $('<div class="nk-navbar-overlay">').appendTo($body);

    // side navbars
    var $leftSide = $('.nk-navbar-left-side');
    var $rightSide = $('.nk-navbar-right-side');
    var $sideNavs = $('.nk-navbar-side');

    // toggle navbars
    function updateTogglers() {
        $('[data-nav-toggle]').each(function () {
            var active = $($(this).attr('data-nav-toggle')).hasClass('open');
            $(this)[(active ? 'add' : 'remove') + 'Class']('active');
        });
    }
    self.toggleSide = function ($side, speed) {
        self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
    };
    self.openSide = function ($side, speed) {
        if ($side.css('display') === 'none') {
            return;
        }

        $side.addClass('open');

        // show sidebar
        tween.to($side, speed || 0.4, {
            x: $side.hasClass('nk-navbar-left-side') ? '100%' : '-100%'
        });

        // show overlay
        if ($side.hasClass('nk-navbar-overlay-content')) {
            tween.to($overlay, 0.3, {
                opacity: 0.6,
                display: 'block'
            });
        }

        updateTogglers();
    };
    self.closeSide = function ($side, speed) {
        $side.each(function () {
            $(this).removeClass('open');

            // hide sidebar
            tween.to(this, speed || 0.4, {
                x: '0%'
            });

            updateTogglers();
        });

        if (!$sideNavs.filter('.nk-navbar-overlay-content.open').length) {
            // hide overlay
            tween.to($overlay, 0.3, {
                opacity: 0,
                display: 'none'
            });
        }
    };
    $doc.on('click', '[data-nav-toggle]', function (e) {
        var $nav = $($(this).attr('data-nav-toggle'));
        if ($nav.hasClass('open')) {
            self.closeSide($nav);
        } else {
            // hide another navigations
            $('[data-nav-toggle]').each(function () {
                self.closeSide($($(this).attr('data-nav-toggle')));
            });

            self.openSide($nav);
        }
        e.preventDefault();
    });

    // overlay
    $doc.on('click', '.nk-navbar-overlay', function () {
        self.closeSide($sideNavs);
    });

    // hide sidebar if it invisible
    self.debounceResize(function () {
        $sideNavs.filter('.open').each(function () {
            if (!$(this).is(':visible')) {
                self.closeSide($(this));
            }
        });
    });

    // swipe side navbars
    if (!isTouch || typeof Hammer === 'undefined') {
        return;
    }
    var swipeStartSize = 50;
    var $swipeItem = void 0;
    var navSize = void 0;
    var openNav = void 0;
    var closeNav = void 0;
    var isRightSide = void 0;
    var isLeftSide = void 0;
    var isScrolling = 0;
    var swipeDir = void 0;
    var sidePos = false;
    var startSwipe = false;
    var endSwipe = false;
    var mc = Hammer(document, {
        touchAction: 'pan-x pan-y'
    });
    mc.add(new Hammer.Pan({
        pointers: 1,
        threshold: 0
    }));
    // If we detect a scroll before a panleft/panright, disable panning
    // thanks: https://github.com/hammerjs/hammer.js/issues/771
    mc.on('panstart', function (e) {
        if (e.additionalEvent === 'panup' || e.additionalEvent === 'pandown') {
            isScrolling = 1;
        }
    });
    // Reenable panning
    mc.on('panend', function (e) {
        if (!isScrolling) {
            if ($swipeItem) {
                var swipeSize = sidePos ? openNav ? sidePos : closeNav ? navSize - sidePos : 0 : 0;
                var transitionTime = Math.max(0.15, 0.4 * (navSize - swipeSize) / navSize);
                var swiped = 0;

                if (swipeSize && swipeSize > 10) {
                    var velocityTest = Math.abs(e.velocityX) > 0.7;
                    if (swipeSize >= navSize / 3 || velocityTest) {
                        swiped = 1;
                        if (openNav) {
                            self.openSide($swipeItem, transitionTime);
                        } else {
                            self.closeSide($swipeItem, transitionTime);
                        }
                    }
                }
                if (!swiped) {
                    if (openNav) {
                        self.closeSide($swipeItem, transitionTime);
                    } else {
                        self.openSide($swipeItem, transitionTime);
                    }
                }
            }
            openNav = closeNav = isRightSide = isLeftSide = swipeDir = sidePos = $swipeItem = startSwipe = endSwipe = false;
        }
        isScrolling = 0;
    });
    mc.on('panleft panright panup pandown', function (e) {
        if (isScrolling) {
            return;
        }

        var isFirst = false;
        var isFinal = e.isFinal;

        if (startSwipe === false) {
            startSwipe = e.center.x;
            isFirst = true;
        }
        endSwipe = e.center.x;

        // init
        if (isFirst) {
            swipeDir = e.direction === 2 ? 'left' : e.direction === 4 ? 'right' : false;

            // right side
            if ($rightSide && $rightSide.length) {
                navSize = $rightSide.width();

                // open
                if (wndW - startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = isRightSide = 1;
                }

                // close
                else if (wndW - startSwipe >= navSize - 100 && $rightSide.hasClass('open')) {
                        closeNav = isRightSide = 1;
                    }
            }

            // left side
            if ($leftSide && $leftSide.length && !isRightSide && $leftSide.is(':visible')) {
                navSize = $leftSide.width();

                // open
                if (startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = isLeftSide = 1;
                }

                // close
                else if (startSwipe >= navSize - 100 && $leftSide.hasClass('open')) {
                        closeNav = isLeftSide = 1;
                    }
            }

            // swipe item
            $swipeItem = isLeftSide ? $leftSide : isRightSide ? $rightSide : false;

            // move
        } else if (!isFinal && $swipeItem) {
                if (isRightSide && (openNav && swipeDir === 'left' || closeNav && swipeDir === 'right')) {
                    // open side navbar
                    if (openNav) {
                        sidePos = Math.min(navSize, Math.max(0, startSwipe - endSwipe));
                    }

                    // close side navbar
                    if (closeNav) {
                        var curPos = startSwipe - endSwipe;
                        if (startSwipe < wndW - navSize) {
                            curPos = wndW - navSize - endSwipe;
                        }
                        sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos)));
                    }

                    tween.set($swipeItem, {
                        x: -100 * sidePos / navSize + '%'
                    });
                } else if (isLeftSide && (openNav && swipeDir === 'right' || closeNav && swipeDir === 'left')) {
                    // open mobile navbar
                    if (openNav) {
                        sidePos = Math.min(navSize, Math.max(0, endSwipe - startSwipe));
                    }

                    // close mobile navbar
                    if (closeNav) {
                        var curPos2 = endSwipe - startSwipe;
                        if (startSwipe > navSize) {
                            curPos2 = endSwipe - navSize;
                        }
                        sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos2)));
                    }

                    tween.set($swipeItem, {
                        x: 100 * sidePos / navSize + '%'
                    });
                }
            }

        if (isRightSide || isLeftSide) {
            e.srcEvent.preventDefault();
        }
    });
}

/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/
function _initNavbarDropEffect() {
    var self = this;
    var $navbars = $('.nk-navbar-side, .nk-navbar-full');

    // add back item for dropdowns
    $navbars.find('.dropdown').prepend('<li class="bropdown-back"><a href="#">' + self.options.templates.secondaryNavbarBackItem + '</a></li>');

    // change height of opened dropdown
    function updateSideNavDropdown($item) {
        var $nav = $item.parents('.nk-navbar:eq(0)');
        var $khNav = $nav.find('.nk-nav');
        var $drop = $nav.find('.nk-drop-item.open > .dropdown:not(.closed)');
        var $nano = $item.parents('.nano:eq(0)');
        var $nanoCont = $nano.children('.nano-content');
        var $rows = $item.parents('.nk-nav-row:eq(0)').siblings('.nk-nav-row');
        if ($drop.length) {
            var dropHeight = $drop.innerHeight();

            // vertical center for dropdown
            if ($nav.hasClass('nk-navbar-align-center')) {
                (function () {
                    $drop.css({
                        top: 0
                    });

                    var nanoHeight = $nano.innerHeight();
                    var nanoNavRowHeight = nanoHeight;
                    var nanoTop = $nano.offset().top;
                    var dropTop = $drop.offset().top;

                    // remove additional rows size
                    if ($rows.length) {
                        $rows.each(function () {
                            nanoNavRowHeight = nanoNavRowHeight - $(this).innerHeight();
                        });
                    }

                    if (dropHeight < nanoNavRowHeight) {
                        var top = nanoTop - dropTop - $nanoCont.scrollTop();
                        top += (nanoHeight - dropHeight) / 2;

                        $drop.css({
                            top: top
                        });
                    }
                })();
            }

            $khNav.css('height', dropHeight);
            self.initPluginNano($nav);

            // scroll to top
            tween.to($nanoCont, 0.3, {
                scrollTo: { y: 0 },
                delay: 0.2
            });
        } else {
            $khNav.css('height', '');
        }
        self.initPluginNano($nav);
    }

    // open / close submenu
    function toggleSubmenu(open, $drop) {
        var $newItems = $drop.find('> .dropdown > li > a');
        var $oldItems = $drop.parent().find('> li > a');

        if (open) {
            $drop.addClass('open').parent().addClass('closed');
        } else {
            $drop.removeClass('open').parent().removeClass('closed');

            var tmp = $newItems;
            $newItems = $oldItems;
            $oldItems = tmp;
        }

        // show items
        tween.set($newItems, {
            x: open ? '20%' : '-20%',
            opacity: 0,
            display: 'block'
        }, 0.1);
        tween.staggerTo($newItems, 0.2, {
            x: '0%',
            opacity: 1,
            delay: 0.1
        }, 0.05);

        // hide items
        tween.staggerTo($oldItems, 0.2, {
            x: open ? '-20%' : '20%',
            opacity: 0
        }, 0.05, function () {
            $oldItems.css('display', 'none');
        });
    }

    $navbars.on('click', '.nk-drop-item > a', function (e) {
        toggleSubmenu(true, $(this).parent());
        updateSideNavDropdown($(this));
        e.preventDefault();
    });
    $navbars.on('click', '.bropdown-back > a', function (e) {
        toggleSubmenu(false, $(this).parent().parent().parent());
        updateSideNavDropdown($(this));
        e.preventDefault();
    });
}

/*------------------------------------------------------------------

  Init Counters

-------------------------------------------------------------------*/
function _initCounters() {
    var self = this;
    var $progressCount = $('.nk-progress.nk-count');
    var $numberCount = $('.nk-count:not(.nk-progress)');

    // set default progress
    $progressCount.each(function () {
        $(this).attr('data-nk-count', $(this).attr('data-progress')).find('.nk-progress-line > div').css('width', ($(this).attr('data-nk-count-from') || '0') + '%').find('.nk-progress-percent').html('');
    });

    // set default numbers
    $numberCount.each(function () {
        $(this).attr('data-nk-count', $(this).attr('data-nk-count') || parseInt($(this).text(), 10)).html($(this).attr('data-nk-count-from') || '0');
    });

    var countersNum = 1;
    function runCounters() {
        if (!countersNum) {
            return;
        }

        var progress = $progressCount.filter('[data-nk-count]');
        var numbers = $numberCount.filter('[data-nk-count]');
        countersNum = progress.length + numbers.length;

        // progress
        $progressCount.filter('[data-nk-count]').each(function () {
            var $item = $(this);
            if (self.isInViewport($item)) {
                (function () {
                    var count = {
                        curr: $item.attr('data-nk-count-from') || '0',
                        to: $item.attr('data-nk-count')
                    };
                    var $itemLine = $item.find('.nk-progress-line > div');
                    var $itemLabel = $item.find('.nk-progress-percent');

                    tween.to($itemLine, 1, {
                        width: count.to + '%'
                    });
                    tween.to(count, 1, {
                        curr: count.to,
                        roundProps: 'curr',
                        ease: Circ.easeIn,
                        onUpdate: function onUpdate() {
                            $itemLabel.text(count.curr + '%');
                        }
                    });
                    $item.removeAttr('data-nk-count');
                })();
            }
        });

        // number
        $numberCount.filter('[data-nk-count]').each(function () {
            var $item = $(this);
            if (self.isInViewport($item)) {
                (function () {
                    var count = {
                        curr: $item.text(),
                        to: $item.attr('data-nk-count')
                    };
                    $item.removeAttr('data-nk-count data-nk-count-from');
                    tween.to(count, 1, {
                        curr: count.to,
                        roundProps: 'curr',
                        ease: Circ.easeIn,
                        onUpdate: function onUpdate() {
                            $item.text(count.curr);
                        }
                    });
                })();
            }
        });
    }

    self.throttleScroll(runCounters);
    runCounters();
}

/*------------------------------------------------------------------

  Init Store

-------------------------------------------------------------------*/
function _initStore() {
    var self = this;

    // scroll to ratings
    $doc.on('click', 'a.nk-product-rating', function (e) {
        var isHash = this.hash;
        if (isHash) {
            var $hashBlock = $(isHash).parents('.nk-tabs:eq(0)');
            if ($hashBlock.length) {
                self.scrollTo($hashBlock);
            }
            $('.nk-tabs').find('[data-toggle="tab"][href="' + isHash + '"]').click();
        }
        e.preventDefault();
    });
}

/*------------------------------------------------------------------

 Init News Box

 -------------------------------------------------------------------*/
function _initNewsBox() {
    $doc.on('click', '.nk-news-box .nk-news-box-item', function () {
        var $this = $(this);
        var $info = $this.parents('.nk-news-box:eq(0)').find('.nk-news-box-each-info');

        // get data
        var data = {
            title: $this.find('.nk-news-box-item-title').html(),
            img: $this.find('.nk-news-box-item-full-img').attr('src'),
            categories: $this.find('.nk-news-box-item-categories').html(),
            text: $this.find('.nk-news-box-item-text').html(),
            url: $this.find('.nk-news-box-item-url').attr('href'),
            date: $this.find('.nk-news-box-item-date').html()
        };

        // set data
        $info.find('.nk-news-box-item-title').html(data.title);
        $info.find('.nk-news-box-item-image').css('background-image', 'url("' + data.img + '")');
        $info.find('.nk-news-box-item-categories').html(data.categories);
        $info.find('.nk-news-box-item-text').html(data.text);
        $info.find('.nk-news-box-item-more').attr('href', data.url);
        $info.find('.nk-news-box-item-date').html(data.date);

        // activate item
        $this.addClass('nk-news-box-item-active').siblings().removeClass('nk-news-box-item-active');
    });

    // click on active item on load
    $('.nk-news-box .nk-news-box-item-active').trigger('click');
}

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function _initAnchors() {
    var self = this;

    // click on anchors
    var $leftSideNav = $('.nk-navbar-left-side');
    var $rightSideNav = $('.nk-navbar-right-side');
    function closeNavs() {
        self.closeSide($leftSideNav);
        self.closeSide($rightSideNav);
        self.closeFullscreenNavbar();
    }
    $doc.on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function (e) {
        var isHash = this.hash;
        var isURIsame = this.baseURI === window.location.href;

        if (isHash && isURIsame) {
            var $hashBlock = $(isHash);
            var hash = isHash.replace(/^#/, '');
            if ($hashBlock.length || hash === 'top' || hash === 'bottom') {
                // close navigations
                closeNavs();

                // add hash to address bar
                if ($hashBlock.length) {
                    $hashBlock.attr('id', '');
                    document.location.hash = hash;
                    $hashBlock.attr('id', hash);
                }

                // scroll to block
                self.scrollTo($hashBlock.length ? $hashBlock : hash);

                e.preventDefault();
            }
        }
    });

    // add active class on navbar items
    var $anchorItems = $('.nk-navbar .nk-nav > li > a[href*="#"]');
    var anchorBlocks = [];
    function hashInArray(item) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            if (anchorBlocks[k].hash === item) {
                return k;
            }
        }
        return false;
    }
    // get all anchors + blocks on the page
    $anchorItems.each(function () {
        var hash = this.hash.replace(/^#/, '');
        var $item = $(this).parent();
        var $block = $('#' + hash);

        if (hash && $block.length || hash === 'top') {
            var inArray = hashInArray(hash);
            if (inArray === false) {
                anchorBlocks.push({
                    hash: hash,
                    $item: $item,
                    $block: $block
                });
            } else {
                anchorBlocks[inArray].$item = anchorBlocks[inArray].$item.add($item);
            }
        }
    });
    // prepare anchor list and listen for scroll to activate items in navbar
    function updateAnchorItemsPositions() {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var blockTop = 0;
            var blockH = wndH;
            if (item.$block.length) {
                blockTop = item.$block.offset().top;
                blockH = item.$block.innerHeight();
            }
            item.activate = blockTop - wndH / 2;
            item.deactivate = blockTop + blockH - wndH / 2;
        }
    }
    function setAnchorActiveItem(type, ST) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var active = ST >= item.activate && ST < item.deactivate;
            item.$item[active ? 'addClass' : 'removeClass']('active');
        }
    }
    if (anchorBlocks.length) {
        updateAnchorItemsPositions();
        setAnchorActiveItem('static', $wnd.scrollTop());
        self.throttleScroll(setAnchorActiveItem);
        self.debounceResize(updateAnchorItemsPositions);
    }
}

/*------------------------------------------------------------------

  Init Equal Height

-------------------------------------------------------------------*/
function _initEqualHeight() {
    var self = this;

    function calculate() {
        $('.equal-height:visible').each(function () {
            var currentTallest = 0;
            var currentRowStart = 0;
            var rowDivs = [];
            var topPosition = 0;
            var currentDiv = 0;
            var $el = void 0;
            $(this).children('*').each(function () {
                $el = $(this);
                $el.css('height', '');
                topPosition = $el.position().top;

                if (currentRowStart !== topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].css('height', currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = $el.innerHeight();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].css('height', currentTallest);
                }
            });
        });
    }

    calculate();
    self.debounceResize(calculate);
}

/*------------------------------------------------------------------

  Init Video Blocks

-------------------------------------------------------------------*/
function _initVideoBlocks() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    var self = this;

    // init plain video
    function addPlainPlayButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon);
    }
    $('.nk-plain-video[data-video]').each(function () {
        var $plainCont = $(this);
        var $plainIframe = void 0;
        var url = $(this).attr('data-video');
        var api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1
        });

        if (api && api.isValid()) {
            var loaded = 0;
            api.getIframe(function (iframe) {
                // add iframe
                $plainIframe = $(iframe);
                var $parent = $plainIframe.parent();
                tween.set(iframe, {
                    opacity: 0,
                    display: 'none'
                });
                $plainIframe.appendTo($plainCont);
                $parent.remove();

                // add play button
                $plainCont.append('<span class="nk-video-plain-toggle"></span>');
                addPlainPlayButton($plainCont);

                // add play event
                $plainCont.on('click', function () {
                    api.play();

                    // add loading button
                    if (!loaded) {
                        addPlainLoadButton($plainCont);
                    }
                });
            });
            api.getImageURL(function (imgSrc) {
                $plainCont.css('background-image', 'url("' + imgSrc + '")');
            });
            api.on('play', function () {
                tween.to($plainIframe, 0.5, {
                    opacity: 1,
                    display: 'block',
                    onComplete: function onComplete() {
                        // add play button
                        if (!loaded) {
                            addPlainPlayButton($plainCont);
                            loaded = 1;
                        }
                    }
                });

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
            api.on('pause', function () {
                tween.to($plainIframe, 0.5, {
                    opacity: 0,
                    display: 'none'
                });
            });
        }
    });
}

/*------------------------------------------------------------------

  Init GIFs

-------------------------------------------------------------------*/
function _initGIF() {
    var self = this;

    // load gif in background
    function loadGif(url, cb) {
        var temp = new Image();
        temp.onload = function () {
            cb();
        };
        temp.src = url;
    }

    // play gif
    function playGif(item) {
        var $item = $(item);
        if (!item.gifPlaying) {
            item.gifPlaying = true;
            if (item.khGifLoaded) {
                $item.addClass('nk-gif-playing');
                $item.find('img').attr('src', $item.find('img').attr('data-gif'));
            } else if (!item.khGifLoading) {
                item.khGifLoading = 1;
                $item.addClass('nk-gif-loading');
                loadGif($item.find('img').attr('data-gif'), function () {
                    item.khGifLoaded = 1;
                    $item.removeClass('nk-gif-loading');
                    if (item.gifPlaying) {
                        item.gifPlaying = false;
                        playGif(item);
                    }
                });
            }
        }
    }

    // stop playing gif
    function stopGif(item) {
        var $item = $(item);
        if (item.gifPlaying) {
            item.gifPlaying = false;
            $item.removeClass('nk-gif-playing');
            $item.find('img').attr('src', $item.find('img').attr('data-gif-static'));
        }
    }

    // prepare gif containers
    $('.nk-gif').each(function () {
        var $this = $(this);
        // add toggle button
        $this.append('<a class="nk-gif-toggle">' + self.options.templates.gifIcon + '</a>');

        // add loading circle
        $this.append('<div class="nk-loading-spinner"><i></i></div>');

        $this.find('img').attr('data-gif-static', $this.find('img').attr('src'));
    });

    // hover gif
    $('.nk-gif-hover').on('mouseenter', function () {
        $(this).addClass('hover');
        playGif(this);
    }).on('mouseleave', function () {
        $(this).removeClass('hover');
        stopGif(this);
    });

    // click gif
    $('.nk-gif-click').on('click', function () {
        if (this.gifPlaying) {
            $(this).removeClass('hover');
            stopGif(this);
        } else {
            $(this).addClass('hover');
            playGif(this);
        }
    });

    // autoplay in viewport
    var $gifVP = $('.nk-gif-viewport');
    if ($gifVP.length) {
        self.throttleScroll(function () {
            $gifVP.each(function () {
                var inVP = self.isInViewport($(this), 1);
                if (inVP[0]) {
                    if (inVP[1].height / wndH < 0.7) {
                        if (inVP[0] === 1) {
                            playGif(this);
                        } else {
                            stopGif(this);
                        }
                    } else {
                        if (inVP[0] >= 0.7) {
                            playGif(this);
                        } else {
                            stopGif(this);
                        }
                    }
                } else {
                    stopGif(this);
                }
            });
        });
    }

    // autoplay gif
    $('.nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)').each(function () {
        playGif(this);
    });
}

/*------------------------------------------------------------------

  Init Info Boxes / Alerts

-------------------------------------------------------------------*/
function _initInfoBoxes() {
    var self = this;

    // close
    $doc.on('click', '.nk-info-box .nk-info-box-close', function (e) {
        e.preventDefault();
        var $box = $(this).parents('.nk-info-box:eq(0)');
        tween.to($box, 0.3, {
            opacity: 0,
            onComplete: function onComplete() {
                tween.to($box, 0.3, {
                    height: 0,
                    padding: 0,
                    margin: 0,
                    display: 'none',
                    onComplete: function onComplete() {
                        self.debounceResize();
                    }
                });
            }
        });
    });
}

/*------------------------------------------------------------------

  Init AJAX Forms

-------------------------------------------------------------------*/
function _initForms() {
    if (typeof $.fn.ajaxSubmit === 'undefined' || typeof $.validator === 'undefined') {
        return;
    }
    var self = this;

    // Validate Khaki Forms
    $('form:not(.nk-form-ajax):not(.nk-mchimp)').each(function () {
        $(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            }
        });
    });
    // ajax form
    $('form.nk-form-ajax').each(function () {
        $(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler(form) {
                var $responseSuccess = $(form).find('.nk-form-response-success');
                var $responseError = $(form).find('.nk-form-response-error');
                $(form).ajaxSubmit({
                    type: 'POST',
                    success: function success(response) {
                        response = JSON.parse(response);
                        if (response.type && response.type === 'success') {
                            $responseError.hide();
                            $responseSuccess.html(response.response).show();
                            form.reset();
                        } else {
                            $responseSuccess.hide();
                            $responseError.html(response.response).show();
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });
}

/*------------------------------------------------------------------

  Init MailChimp

-------------------------------------------------------------------*/
function _initFormsMailChimp() {
    var $mchimp = $('form.nk-mchimp');
    if (typeof $.fn.ajaxSubmit === 'undefined' || typeof $.validator === 'undefined' || !$mchimp.length) {
        return;
    }
    var self = this;

    // Additional Validate Methods From MailChimp
    // Validate a multifield birthday
    $.validator.addMethod('mc_birthday', function (date, element, grouping_class) {
        var isValid = false;
        var $fields = $('input:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
                var dateArray = new Array();
                dateArray.month = $fields.filter('input[name*="[month]"]').val();
                dateArray.day = $fields.filter('input[name*="[day]"]').val();

                // correct month value
                dateArray.month = dateArray.month - 1;

                var testDate = new Date(1970, dateArray.month, dateArray.day);
                if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month) {
                    isValid = false;
                } else {
                    isValid = true;
                }
            }
        return isValid;
    }, 'Please enter a valid month and day.');

    // Validate a multifield date
    $.validator.addMethod('mc_date', function (date, element, grouping_class) {
        var isValid = false;
        var $fields = $('input:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
                var dateArray = new Array();
                dateArray.month = $fields.filter('input[name*="[month]"]').val();
                dateArray.day = $fields.filter('input[name*="[day]"]').val();
                dateArray.year = $fields.filter('input[name*="[year]"]').val();

                // correct month value
                dateArray.month = dateArray.month - 1;

                // correct year value
                if (dateArray.year.length < 4) {
                    dateArray.year = parseInt(dateArray.year, 10) < 50 ? 2000 + parseInt(dateArray.year, 10) : 1900 + parseInt(dateArray.year, 10);
                }

                var testDate = new Date(dateArray.year, dateArray.month, dateArray.day);
                if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month || testDate.getFullYear() !== dateArray.year) {
                    isValid = false;
                } else {
                    isValid = true;
                }
            }
        return isValid;
    }, 'Please enter a valid date');

    // Validate a multifield phone number
    $.validator.addMethod('mc_phone', function (phone_number, element, grouping_class) {
        var isValid = false;
        var $fields = $('input:filled:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
                phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
                isValid = phone_number.length === 10 && phone_number.match(/[0-9]{9}/);
            }
        return isValid;
    }, 'Please specify a valid phone number');

    $.validator.addMethod('skip_or_complete_group', function (value, element, grouping_class) {
        var $fields = $('input:not(:hidden)', $(element).closest(grouping_class)),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : $.extend({}, this),
            numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length,
            isValid = numberFilled === 0 || numberFilled === $fields.length;

        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each field's validation rules
        if (!$(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, $.validator.format('Please supply missing fields.'));

    $.validator.addMethod('skip_or_fill_minimum', function (value, element, options) {
        var $fields = $(options[1], element.form),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : $.extend({}, this),
            numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length,
            isValid = numberFilled === 0 || numberFilled >= options[0];
        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
        if (!$(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, $.validator.format('Please either skip these fields or fill at least {0} of them.'));

    $.validator.addMethod('zipcodeUS', function (value, element) {
        return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, 'The specified US ZIP Code is invalid');

    $mchimp.each(function () {
        var $form = $(this);
        if (!$form.length) {
            return;
        }

        var validator = $form.validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            // Grouping fields makes jQuery Validation display one error for all the fields in the group
            // It doesn't have anything to do with how the fields are validated (together or separately),
            // it's strictly for visual display of errors
            groups: function groups() {
                var groups = {};
                $form.find('.input-group').each(function () {
                    var inputs = $(this).find('input:text:not(:hidden)'); // TODO: What about non-text inputs like number?
                    if (inputs.length > 1) {
                        var mergeName = inputs.first().attr('name');
                        var fieldNames = $.map(inputs, function (f) {
                            return f.name;
                        });
                        groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ');
                    }
                });
                return groups;
            },
            // Place a field's inline error HTML just before the div.input-group closing tag
            errorPlacement: function errorPlacement(error, element) {
                element.closest('.input-group').after(error);
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler() {
                var $responseSuccess = $form.find('.nk-form-response-success');
                var $responseError = $form.find('.nk-form-response-error');
                var url = $form.attr('action');
                url = url.replace('/post?u=', '/post-json?u=');
                url += '&c=?';

                $form.ajaxSubmit({
                    type: 'GET',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    success: function success(resp) {
                        $responseSuccess.hide();
                        $responseError.hide();

                        // On successful form submission, display a success message and reset the form
                        if (resp.result === 'success') {
                            $responseSuccess.show().html(resp.msg);
                            $form[0].reset();

                            // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                        } else {

                                // Example errors - Note: You only get one back at a time even if you submit several that are bad.
                                // Error structure - number indicates the index of the merge field that was invalid, then details
                                // Object {result: "error", msg: "6 - Please enter the date"}
                                // Object {result: "error", msg: "4 - Please enter a value"}
                                // Object {result: "error", msg: "9 - Please enter a complete address"}

                                // Try to parse the error into a field index and a message.
                                // On failure, just put the dump thing into in the msg letiable.
                                var index = -1;
                                var msg = void 0;
                                try {
                                    var parts = resp.msg.split(' - ', 2);
                                    if (typeof parts[1] === 'undefined') {
                                        msg = resp.msg;
                                    } else {
                                        i = parseInt(parts[0], 10);
                                        if (i.toString() === parts[0]) {
                                            index = parts[0];
                                            msg = parts[1];
                                        } else {
                                            index = -1;
                                            msg = resp.msg;
                                        }
                                    }
                                } catch (e) {
                                    index = -1;
                                    msg = resp.msg;
                                }

                                try {
                                    // If index is -1 if means we don't have data on specifically which field was invalid.
                                    // Just lump the error message into the generic response div.
                                    if (index === -1) {
                                        $responseError.show().html(msg);
                                    } else {
                                        var fieldName = $form.find('input[name]:eq(' + index + ')').attr('name'); // Make sure this exists
                                        var data = {};
                                        data[fieldName] = msg;
                                        validator.showErrors(data);
                                    }
                                } catch (e) {
                                    $responseError.show().html(msg);
                                }
                            }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });

    // Custom validation methods for fields with certain css classes
    $.validator.addClassRules('birthday', { digits: true, mc_birthday: '.datefield' });
    $.validator.addClassRules('datepart', { digits: true, mc_date: '.datefield' });
    $.validator.addClassRules('phonepart', { digits: true, mc_phone: '.phonefield' });
}

/*------------------------------------------------------------------

 Init Audio Player

 -------------------------------------------------------------------*/
function _initAudioPlayer() {
    if (typeof soundManager === 'undefined') {
        return;
    }

    var _self = this;
    var progressBusy = false; // busy when user drag progress bar

    /* Plain audio players */
    var $playersPlain = $('.nk-audio-plain');
    // add play and pause buttons
    $playersPlain.prepend(_self.options.templates.audioPlainButton);
    var PlayersPlain = function PlayersPlain($item) {
        var self = this;
        self.$item = $item;
        self.url = $item.attr('data-src');
        self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
        self.$progress = $item.find('.nk-audio-progress-current');

        self.$timer = $item.find('.nk-audio-plain-duration');
        self.$timer.attr('data-duration', self.$timer.text());

        function onPlay() {
            $item.addClass('nk-audio-plain-playing');
        }
        function onStop() {
            $item.removeClass('nk-audio-plain-playing');
            self.$timer = $item.find('.nk-audio-plain-duration');
            self.$timer.text(self.$timer.attr('data-duration'));
        }
        self.api = soundManager.createSound({
            volume: 100,
            whileplaying: function whileplaying() {
                self.step();
            },

            onplay: onPlay,
            onresume: onPlay,
            onpause: onStop,
            onstop: onStop,
            onload: function onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            }
        });

        self.$playPauseBtn.on('click', function () {
            if (!self.api.paused && self.api.url) {
                self.pause();
            } else {
                self.play();
            }
        });
    };
    PlayersPlain.prototype = {
        /**
         * Play a song in the playlist.
         * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
         */
        play: function play() {
            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            this.api.play({
                url: this.url
            });
        },

        /**
         * Pause the currently playing track.
         */
        pause: function pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },

        /**
         * Seek to a new position in the currently playing track.
         * @param  {Number} per Percentage through the song to skip.
         */
        seek: function seek(per) {
            this.api.setPosition(this.api.duration * per);
        },
        /**
         * The step called within requestAnimationFrame to update the playback position.
         */
        step: function step() {
            var self = this;
            // Determine our current seek position.
            var seek = self.api.position || 0;
            self.progress = seek / self.api.duration;
            self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!progressBusy) {
                self.$progress[0].style.width = (self.progress * 100 || 0) + '%';
            }
        },

        /**
         * Format the time from seconds to M:SS.
         * @param  {Number} secs Seconds to format.
         * @return {String}      Formatted time.
         */
        formatTime: function formatTime(msec) {
            var secs = Math.round(msec / 1000) || 0;
            var minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            var seconds = secs - minutes * 60;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    };

    // progress
    if (typeof Hammer !== 'undefined') {
        var $progresses = $playersPlain.find('.nk-audio-progress');
        $progresses.each(function () {
            var $curProgressCont = $(this);
            var $curProgres = $curProgressCont.children();
            var curApi = void 0;
            var progressW = void 0;
            var progressCurW = void 0;
            var progressStart = false;
            var HammerProgress = new Hammer.Manager($curProgressCont[0]);
            HammerProgress.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0
            }));
            HammerProgress.add(new Hammer.Press({
                time: 1
            }));
            HammerProgress.on('pan press pressup', function (e) {
                // start
                if (e.type === 'press' || progressStart === false) {
                    progressBusy = true;
                    progressW = $curProgressCont.width();
                    progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
                    $curProgressCont.addClass('hover');
                }

                // each
                progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
                $curProgres[0].style.width = progressCurW * 100 + '%';

                // end
                if (e.isFinal || e.type === 'pressup') {
                    if (!curApi) {
                        curApi = $curProgressCont.parents('.nk-audio-player-main, .nk-audio-plain')[0].audioAPI;
                    }
                    curApi && curApi.seek(progressCurW);

                    $curProgressCont.removeClass('hover');
                    progressBusy = false;
                    progressStart = false;
                }

                e.preventDefault();
            });
        });
    }

    soundManager.onready(function () {
        if ($playersPlain.length) {
            $playersPlain.each(function () {
                this.audioAPI = new PlayersPlain($(this));
            });
        }
    });
}

/*------------------------------------------------------------------

 Init Image Slider

 -------------------------------------------------------------------*/
function _initImageSlider() {
    var $sliders = $('.nk-image-slider');

    // transition animation
    function transitionStart(data, currentSlide, cb) {
        // set new bg
        data.$bgTransition.css({
            'background-image': 'url(\'' + currentSlide.image + '\')'
        });
        tween.set(data.$bgTransition, {
            scale: 1.4,
            opacity: 0
        });
        tween.to(data.$bgTransition, 0.5, {
            scale: 1,
            opacity: 1,
            zIndex: -1,
            onComplete: function onComplete() {
                // change default background image
                data.$bg.css({
                    'background-image': 'url(\'' + currentSlide.image + '\')'
                });
                tween.set(data.$bgTransition, {
                    opacity: 0,
                    zIndex: -2
                });
            }
        });

        // set new content
        tween.to(data.$contentWrapper, 0.5, {
            opacity: 0,
            onComplete: function onComplete() {
                data.$content.html(currentSlide.content);
                if (currentSlide.content) {
                    tween.to(data.$contentWrapper, 0.5, {
                        opacity: 1
                    });
                }
                if (cb) {
                    cb();
                }
            }
        });
    }

    // select slide
    var busy = 0;
    function selectSlide($slider) {
        var slideNum = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        if (busy) {
            return;
        }
        busy = 1;
        var data = $slider.data('nk-image-slider');

        // get next slide
        if (slideNum === false) {
            slideNum = data.$thumbs.find('.nk-image-slider-thumbs-active').index() + 1;
        }

        var currentSlide = data.slides[slideNum];

        // in there is no selected slide
        if (typeof currentSlide === 'undefined') {
            slideNum = 0;
            currentSlide = data.slides[slideNum];
        }

        // stop autoplay
        data.stopAutoplay();

        // select thumb
        data.selectThumb(slideNum);

        // start transition
        transitionStart(data, currentSlide, function () {
            // update nano
            if (typeof $.fn.nanoScroller !== 'undefined') {
                data.$content.parent('.nano').nanoScroller();
            }

            // run autoplay
            data.runAutoplay();
            busy = 0;
        });
    }

    // convert time for timer format from ms to ceil second
    function convertTime(time) {
        return Math.ceil(time / 1000);
    }

    // prepare each slider
    $sliders.each(function () {
        var $this = $(this);
        var autoplay = parseInt($this.attr('data-autoplay'), 10) || false;
        var slides = [];
        var defaultSlide = 0;

        // parse all slides
        $this.find('.nk-image-slider-item').each(function () {
            var $slide = $(this);
            slides.push({
                image: $slide.find('.nk-image-slider-img').attr('src'),
                thumb: $slide.find('.nk-image-slider-img').attr('data-thumb'),
                content: $slide.find('.nk-image-slider-content').html()
            });
        });

        // no slides
        if (!slides.length) {
            $this.remove();
            return;
        }

        // prepare slider inner template
        var thumbs = '';
        for (var k in slides) {
            thumbs += '<li class="' + (k == defaultSlide ? 'nk-image-slider-thumbs-active' : '') + '" style="background-image: url(\'' + slides[k].thumb + '\');"><div class="nk-image-slider-thumbs-overlay"></div></li>';
        }
        var template = '\n            <div class="nk-image-slider-bg" style="background-image: url(\'' + slides[defaultSlide].image + '\');"></div>\n            <div class="nk-image-slider-bg-transition"></div>\n            <div class="nk-image-slider-content">\n                <div class="nano">\n                    <div class="nano-content">' + slides[defaultSlide].content + '</div>\n                </div>\n            </div>\n            <div class="nk-image-slider-thumbs">\n                <ul>' + thumbs + '</ul>\n            </div>\n        ';

        // append template in slider
        $this.append(template);

        // move thumbs cont
        var $thumbs = $this.find('.nk-image-slider-thumbs');
        var $thumbsCont = $thumbs.find('> ul');
        var startX = false;
        var curX = 0;
        var thumbsW = 0;
        var thumbsContW = 0;

        function updateThumbsData() {
            if ($thumbsCont[0]._gsTransform && $thumbsCont[0]._gsTransform.x) {
                curX = $thumbsCont[0]._gsTransform.x;
            } else {
                curX = 0;
            }
            thumbsW = $thumbs.width();
            thumbsContW = $thumbsCont.width();
        }

        // select current thumb and scroll
        function selectThumb(i) {
            $thumbs.find('li:eq(' + i + ')').addClass('nk-image-slider-thumbs-active').siblings().removeClass('nk-image-slider-thumbs-active');

            //
            var $nextItem = $thumbs.find('li:eq(' + (i + 1) + ')');
            if (!$nextItem.length) {
                $nextItem = $thumbs.find('li:eq(' + 0 + ')');
            }

            // scroll nav
            updateThumbsData();
            var nextLeft = $nextItem.position().left;
            if (nextLeft < 0) {
                tween.to($thumbsCont, 0.2, {
                    x: curX - nextLeft
                });
            } else {
                var nextW = $nextItem.width();
                if (nextLeft + nextW > thumbsW) {
                    tween.to($thumbsCont, 0.2, {
                        x: curX - (nextLeft + nextW - thumbsW)
                    });
                }
            }
        }

        var mc = new Hammer.Manager($thumbs[0]);
        mc.add(new Hammer.Pan({
            pointers: 1,
            threshold: 0
        }));
        mc.on('pan press', function (e) {
            e.preventDefault();

            // init
            if (startX === false) {
                startX = curX;
                updateThumbsData();
                $thumbs.addClass('is-dragging');
            }

            // move
            if (thumbsContW > thumbsW) {
                curX = Math.min(0, Math.max(e.deltaX + startX, thumbsW - thumbsContW));
                tween.set($thumbsCont, {
                    x: curX
                });
            }
            if (e.isFinal) {
                $thumbs.removeClass('is-dragging');
                startX = false;
            }
        });

        // setup autoplay
        var autoplayInterval = void 0;
        var autoplayStart = new Date();
        var autoplayPaused = void 0;
        function stopAutoplay() {
            var dontTouchCount = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            if (!autoplay) {
                return;
            }
            clearInterval(autoplayInterval);
            if (!dontTouchCount) {
                $thumbs.find('.nk-image-slider-thumbs-count').remove();
            }
        }
        function runAutoplay() {
            if (!autoplay) {
                return;
            }
            var $currentThumb = $thumbs.find('.nk-image-slider-thumbs-active');
            var $nextThumb = $currentThumb.next();
            if (!$nextThumb.length) {
                $nextThumb = $thumbs.find('li:eq(0)');
            }

            // remove old timer
            $thumbs.find('.nk-image-slider-thumbs-count').remove();

            // add new timer
            var $timer = $('<div class="nk-image-slider-thumbs-count"></div>').text(convertTime(autoplay));
            $nextThumb.append($timer);

            autoplayStart = +new Date();

            stopAutoplay(1);
            var prevValue = autoplay;
            autoplayInterval = setInterval(function () {
                if (autoplayPaused) {
                    return;
                }
                var currentTime = autoplayStart + autoplay - new Date();

                // fix if counter > autoplay (occurs when you click on thumbnails)
                if (currentTime > autoplay) {
                    autoplayStart = +new Date();
                    currentTime = autoplay;
                }

                // update value on thumbnail when counter was changed
                if (prevValue !== convertTime(currentTime)) {
                    prevValue = convertTime(currentTime);
                    $timer.text(prevValue);
                }

                // stop autoplay and select next slide
                if (currentTime <= 0) {
                    stopAutoplay();
                    selectSlide($this);
                }
            }, 100);
        }
        function pauseAutoplay() {
            autoplayPaused = +new Date();
        }
        function resumeAutoplay() {
            autoplayStart += new Date() - autoplayPaused;
            autoplayPaused = false;
        }

        // save slider data
        var data = {
            slides: slides,
            autoplay: autoplay,
            $thumbs: $thumbs,
            $thumbsCont: $thumbsCont,
            $content: $this.find('.nk-image-slider-content .nano-content'),
            $contentWrapper: $this.find('.nk-image-slider-content'),
            $bg: $this.find('.nk-image-slider-bg'),
            $bgTransition: $this.find('.nk-image-slider-bg-transition'),
            runAutoplay: runAutoplay,
            stopAutoplay: stopAutoplay,
            pauseAutoplay: pauseAutoplay,
            resumeAutoplay: resumeAutoplay,
            selectThumb: selectThumb
        };
        $this.data('nk-image-slider', data);

        // start autoplay
        runAutoplay();
    });

    // click handler
    $doc.on('click', '.nk-image-slider .nk-image-slider-thumbs li:not(.nk-image-slider-thumbs-active)', function () {
        var $li = $(this);
        var $slider = $li.parents('.nk-image-slider:eq(0)');
        selectSlide($slider, $li.index());
    });

    // pause autoplay on mouseenter
    $doc.on('mouseenter', '.nk-image-slider', function () {
        var data = $(this).data('nk-image-slider');
        if (data) {
            data.pauseAutoplay();
        }
    });
    $doc.on('mouseleave', '.nk-image-slider', function () {
        var data = $(this).data('nk-image-slider');
        if (data) {
            data.resumeAutoplay();
        }
    });
}

/*------------------------------------------------------------------

  Facebook

-------------------------------------------------------------------*/
function _initFacebook() {
    if (!$('.fb-page').length) {
        return;
    }
    var self = this;

    $body.append('<div id="fb-root"></div>');

    (function (d, s, id) {
        if (location.protocol === 'file:') {
            return;
        }
        var js = void 0,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // resize on facebook widget loaded
    window.fbAsyncInit = function () {
        FB.Event.subscribe('xfbml.render', function () {
            self.debounceResize();
        });
    };
}

/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/
function _initInstagram() {
    var self = this;
    var $instagram = $('.nk-instagram');
    if (!$instagram.length || !self.options.templates.instagram) {
        return;
    }

    /**
     * Templating a instagram item using '{{ }}' braces
     * @param  {Object} data Instagram item details are passed
     * @return {String} Templated string
     */
    function templating(data, temp) {
        var temp_variables = ['link', 'image', 'caption'];

        for (var _i = 0, len = temp_variables.length; _i < len; _i++) {
            temp = temp.replace(new RegExp('{{' + temp_variables[_i] + '}}', 'gi'), data[temp_variables[_i]]);
        }

        return temp;
    }

    $instagram.each(function () {
        var $this = $(this);
        var options = {
            userID: $this.attr('data-instagram-user-id') || null,
            count: $this.attr('data-instagram-count') || 6,
            template: $this.attr('data-instagram-template') || self.options.templates.instagram,
            quality: $this.attr('data-instagram-quality') || 'sm', // sm, md, lg
            loadingText: self.options.templates.instagramLoadingText,
            failText: self.options.templates.instagramFailText,
            apiPath: self.options.templates.instagramApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html('<div class="col-xs-12">' + options.failText + '</div>');
            console.error('You should run you website on webserver with PHP to get working Instagram');
            return;
        }

        $this.html('<div class="col-xs-12">' + options.loadingText + '</div>');

        // Fetch instagram images
        $.getJSON(options.apiPath, {
            userID: options.userID,
            count: options.count
        }, function (response) {
            $this.html('');

            for (var _i2 = 0; _i2 < options.count; _i2++) {
                var instaItem = false;
                if (response[_i2]) {
                    instaItem = response[_i2];
                } else if (response.statuses && response.statuses[_i2]) {
                    instaItem = response.statuses[_i2];
                } else {
                    break;
                }

                var resolution = 'thumbnail';
                if (options.quality === 'md') {
                    resolution = 'low_resolution';
                }
                if (options.quality === 'lg') {
                    resolution = 'standard_resolution';
                }

                var temp_data = {
                    link: instaItem.link,
                    image: instaItem.images[resolution].url,
                    caption: instaItem.caption
                };

                $this.append(templating(temp_data, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail(function (a) {
            $this.html('<div class="col-xs-12">' + options.failText + '</div>');
            $.error(a.responseText);
        });
    });
}

/*------------------------------------------------------------------

  Init Twitter

-------------------------------------------------------------------*/
function _initTwitter() {
    var self = this;
    var $twtFeeds = $('.nk-twitter-list');
    if (!$twtFeeds.length || !self.options.templates.twitter) {
        return;
    }

    /**
     * Templating a tweet using '{{ }}' braces
     * @param  {Object} data Tweet details are passed
     * @return {String}      Templated string
     */
    function templating(data, temp) {
        var temp_variables = ['date', 'tweet', 'avatar', 'url', 'retweeted', 'screen_name', 'user_name'];

        for (var _i3 = 0, len = temp_variables.length; _i3 < len; _i3++) {
            temp = temp.replace(new RegExp('{{' + temp_variables[_i3] + '}}', 'gi'), data[temp_variables[_i3]]);
        }

        return temp;
    }

    $twtFeeds.each(function () {
        var $this = $(this);
        var options = {
            username: $this.attr('data-twitter-user-name') || null,
            list: null,
            hashtag: $this.attr('data-twitter-hashtag') || null,
            count: $this.attr('data-twitter-count') || 2,
            hideReplies: $this.attr('data-twitter-hide-replies') === 'true',
            template: $this.attr('data-twitter-template') || self.options.templates.twitter,
            loadingText: self.options.templates.twitterLoadingText,
            failText: self.options.templates.twitterFailText,
            apiPath: self.options.templates.twitterApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html(options.failText);
            console.error('You should run you website on webserver with PHP to get working Twitter');
            return;
        }

        // Set loading
        $this.html('<span>' + options.loadingText + '</span>');

        // Fetch tweets
        $.getJSON(options.apiPath, {
            username: options.username,
            list: options.list,
            hashtag: options.hashtag,
            count: options.count,
            exclude_replies: options.hideReplies
        }, function (twt) {
            $this.html('');

            for (var _i4 = 0; _i4 < options.count; _i4++) {
                var tweet = false;
                if (twt[_i4]) {
                    tweet = twt[_i4];
                } else if (twt.statuses && twt.statuses[_i4]) {
                    tweet = twt.statuses[_i4];
                } else {
                    break;
                }

                var temp_data = {
                    user_name: tweet.user.name,
                    date: tweet.date_formatted,
                    tweet: tweet.text_entitled,
                    avatar: '<img src="' + tweet.user.profile_image_url + '" />',
                    url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
                    retweeted: tweet.retweeted,
                    screen_name: tweet.user.screen_name
                };

                $this.append(templating(temp_data, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail(function (a) {
            $this.html(options.failText);
            $.error(a.responseText);
        });
    });
}

/*------------------------------------------------------------------

  Init Documentation

-------------------------------------------------------------------*/
function _initDoc() {
    var self = this;
    var $menu = $('.nk-doc-links');
    var $firstBlocks = $('.nk-doc > .nk-doc-item');
    var $childBlocks = $('.nk-doc > .nk-doc-item > .nk-doc-item');
    var $blocks = $firstBlocks.add($childBlocks);
    var blocks = [];

    if (!$blocks.length) {
        return;
    }

    // get block by attr
    function getBlocksBy(by, val, getFrom) {
        var result = [];
        getFrom = getFrom || blocks;
        for (var k = 0; k < getFrom.length; k++) {
            if (getFrom[k] && typeof getFrom[k][by] !== 'undefined' && getFrom[k][by] === val) {
                result.push(getFrom[k]);
            }
        }
        return result;
    }

    // prepare links
    var uniqID = 0;
    var hashID = 0;
    function prepareLinks($block) {
        if (!hashID) {
            uniqID++;
        }
        var title = $block.find('> h2, > h3').eq(0).text();
        var hash = 'doc-' + title.replace(/\s+/g, '-').toLowerCase() + (hashID ? '-' + hashID : '');

        if (getBlocksBy('hash', hash).length) {
            hashID++;
            return prepareLinks($block);
        }

        $block.attr('data-id', uniqID);

        // add parent value if this is child
        var parent = false;
        var $parent = $block.parents('.nk-doc-item:eq(0)');
        if ($parent.length) {
            parent = parseInt($parent.attr('data-id'), 10);
        }

        hashID = 0;

        return {
            id: uniqID,
            title: title,
            hash: hash,
            $block: $block,
            parent: parent
        };
    }
    $firstBlocks.each(function () {
        var block = prepareLinks($(this));
        blocks.push(block);
    });
    $childBlocks.each(function () {
        var block = prepareLinks($(this));
        blocks.push(block);
    });

    // activate block
    var firstRun = 1;
    function activeBlock(id) {
        // add hash
        var selectedBlock = getBlocksBy('id', id)[0];
        var issetChilds = getBlocksBy('parent', id)[0];
        if (issetChilds) {
            activeBlock(issetChilds.id);
            return;
        }
        if (selectedBlock) {
            // hide all blocks
            $blocks.hide();

            // activate menu item
            $menu.find('[data-id]').removeClass('active');
            $menu.find('[data-id=' + id + ']').addClass('active');

            // activate parent menu item
            var parentBlock = getBlocksBy('id', selectedBlock.parent)[0];
            if (parentBlock) {
                $menu.find('[data-id=' + selectedBlock.parent + ']').addClass('active');

                // show parent
                parentBlock.$block.show();
            }

            // show submenu
            var $sub_menus = $menu.find('[data-id] + ul');
            $sub_menus.each(function () {
                var $this = $(this);
                var isActive = !!$this.find('[data-id].active').length;
                var isOpened = $this.hasClass('opened');

                // open
                if (isActive && !isOpened) {
                    $this.css('height', '');
                    $this.show();
                    var h = $this.innerHeight();
                    $this.hide();
                    tween.set($this, {
                        height: 0
                    });
                    tween.to($this, 0.4, {
                        height: h,
                        display: 'block',
                        onComplete: function onComplete() {
                            self.debounceResize();
                        }
                    });
                    $this.addClass('opened');

                    // close
                }

                if (!isActive && isOpened) {
                    tween.to($this, 0.4, {
                        height: 0,
                        display: 'none',
                        onComplete: function onComplete() {
                            self.debounceResize();
                        }
                    });
                    $this.removeClass('opened');
                }
            });

            // show current
            selectedBlock.$block.show();

            location.hash = selectedBlock.hash;

            // resize and scroll to top
            if (!firstRun) {
                self.debounceResize();
                self.scrollTo($('.nk-header-title').next());
            }
            firstRun = 0;
        }
    }

    // create side menu
    var menuTemplate = '';
    for (var k = 0; k < blocks.length; k++) {
        if (blocks[k].parent === false) {
            var childs = getBlocksBy('parent', blocks[k].id);

            menuTemplate += '<li><div data-id="' + blocks[k].id + '">' + blocks[k].title + (childs.length ? ' <sup>[' + childs.length + ']</sup>' : '') + '</div>';

            // add childs
            if (childs.length) {
                menuTemplate += '<ul>';
                for (var _i5 = 0; _i5 < childs.length; _i5++) {
                    menuTemplate += '<li><div data-id="' + childs[_i5].id + '">' + childs[_i5].title + '</div>';
                }
                menuTemplate += '</ul>';
            }

            menuTemplate += '</li>';
        }
    }
    $menu.html('<ul>' + menuTemplate + '</ul>');
    $menu.on('click', '[data-id]:not(.active)', function () {
        activeBlock(parseInt($(this).attr('data-id'), 10));
    });

    // activate default block
    if (location.hash) {
        var curBlock = getBlocksBy('hash', location.hash.replace('#', ''));
        if (curBlock[0]) {
            activeBlock(curBlock[0].id);
        }
    } else {
        activeBlock(blocks[0].id);
    }
}

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function _initPluginStickySidebar() {
    if (typeof $.fn.stick_in_parent === 'undefined') {
        return;
    }

    $('.nk-sidebar-sticky').each(function () {
        $(this).wrapInner('<div>').children().stick_in_parent({
            parent: $(this).parent()
        });
    });
}

/* FastClick */
function _initPluginFastClick() {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
    }
}

/* Nano Scroller */
function _initPluginNano($context) {
    if (typeof $.fn.nanoScroller !== 'undefined') {
        ($context || $doc).find('.nano').nanoScroller();
    }
}

/* Jarallax */
function _initPluginJarallax() {
    if (typeof $.fn.jarallax === 'undefined') {
        return;
    }
    var self = this;

    // video backgrounds
    $('.bg-video[data-video]').each(function () {
        $(this).attr('data-jarallax-video', $(this).attr('data-video'));
        $(this).removeAttr('data-video');
    });

    // primary parallax
    $('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed
    });

    // video without parallax
    $('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1
    });
}

/* Flickity */
function _initPluginFlickity() {
    if (typeof window.Flickity === 'undefined') {
        return;
    }

    var self = this;

    function addDefaultArrows($carousel) {
        $('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="ion-ios-arrow-back"></span></div>').on('click', function () {
            $carousel.flickity('previous');
        }).appendTo($carousel);

        $('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="ion-ios-arrow-forward"></span></div>').on('click', function () {
            $carousel.flickity('next');
        }).appendTo($carousel);
    }

    // prevent click event fire when drag carousel
    function noClickEventOnDrag($carousel) {
        $carousel.on('dragStart', function () {
            $(this).find('.flickity-viewport').addClass('is-dragging');
        });
        $carousel.on('dragEnd', function () {
            $(this).find('.flickity-viewport').removeClass('is-dragging');
        });
    }

    // carousel
    $('.nk-carousel > .nk-carousel-inner').each(function () {
        $(this).flickity({
            pageDots: $(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            imagesLoaded: true,
            cellAlign: $(this).parent().attr('data-cell-align') || 'center'
        });
        if ($(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows($(this));
        }
        noClickEventOnDrag($(this));
    });
}

/* PhotoSwipe */
function _initPluginPhotoswipe() {
    var $gallery = $('.nk-popup-gallery');
    if (typeof PhotoSwipe === 'undefined' || !$gallery.length) {
        return;
    }

    // prepare photoswipe markup
    var markup = '<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="pswp__bg"></div>\n          <div class="pswp__scroll-wrap">\n            <div class="pswp__container">\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n            </div>\n            <div class="pswp__ui pswp__ui--hidden">\n              <div class="pswp__top-bar">\n                <div class="pswp__counter"></div>\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n                <div class="pswp__preloader">\n                  <div class="pswp__preloader__icn">\n                    <div class="pswp__preloader__cut">\n                      <div class="pswp__preloader__donut"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div>\n              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\n              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\n              <div class="pswp__caption">\n                <div class="pswp__caption__center">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
    $body.append(markup);

    // init code
    var parseThumbnailElements = function parseThumbnailElements(el) {
        var thumbElements = $(el).find('a.nk-gallery-item'),
            items = [],
            childElements = void 0,
            descrElement = void 0,
            size = void 0,
            item = void 0;

        thumbElements.each(function () {
            childElements = $(this).find('img');
            descrElement = $(this).next('.nk-gallery-item-description');
            size = (this.getAttribute('data-size') || '1920x1080').split('x');

            // create slide object
            item = {
                src: this.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                author: this.getAttribute('data-author')
            };

            if (descrElement.length) {
                item.title = descrElement.html();
            }

            // save link to element for getThumbBoundsFn
            item.el = this;

            if (childElements.length > 0) {
                // thumbnail url
                item.msrc = item.src;
                if (childElements.length > 1) {
                    item.title = $(childElements).filter('.photoswipe-description').html();
                }
            }

            var mediumSrc = this.getAttribute('data-med') || item.src;
            if (mediumSrc) {
                size = (this.getAttribute('data-med-size') || this.getAttribute('data-size') || '1920x1080').split('x');
                // "medium-sized" image
                item.m = {
                    src: mediumSrc,
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
            }

            // original image
            item.o = {
                src: item.src,
                w: item.w,
                h: item.h
            };
            items.push(item);
        });

        return items;
    };

    var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = $('.pswp')[0],
            gallery = void 0,
            options = void 0,
            items = void 0;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            captionAndToolbarShowEmptyCaptions: false,
            mainClass: 'pswp--minimal--dark',
            barsSize: { top: 0, bottom: 0 },
            captionEl: true,
            fullscreenEl: false,
            shareEl: false,
            bgOpacity: 0.85,
            tapToClose: true,
            tapToToggleControls: false,
            showHideOpacity: true,

            // Function builds caption markup
            addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl) {
                // item      - slide object
                // captionEl - caption DOM element
                // isFake    - true when content is added to fake caption container
                //             (used to get size of next or previous caption)

                if (!item.title && !item.author) {
                    captionEl.children[0].innerHTML = '';
                    return false;
                }
                var caption = '';
                if (item.title) {
                    caption += item.title;
                }
                if (item.author) {
                    if (item.title) {
                        caption += '<br>';
                    }
                    caption += '<small>' + item.author + '</small>';
                }
                captionEl.children[0].innerHTML = caption;
                return true;
            },

            galleryUID: galleryElement.getAttribute('data-pswp-uid')
        };

        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid === index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        // see: http://photoswipe.com/documentation/responsive-images.html
        var realViewportWidth = void 0,
            useLargeImages = false,
            firstResize = true,
            imageSrcWillChange = void 0;

        gallery.listen('beforeResize', function () {
            var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;

            if (realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || screen.width > 1200) {
                if (!useLargeImages) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }
            } else {
                if (useLargeImages) {
                    useLargeImages = false;
                    imageSrcWillChange = true;
                }
            }

            if (imageSrcWillChange && !firstResize) {
                gallery.invalidateCurrItems();
            }

            if (firstResize) {
                firstResize = false;
            }

            imageSrcWillChange = false;
        });

        gallery.listen('gettingData', function (idx, item) {
            if (useLargeImages) {
                item.src = item.o.src;
                item.w = item.o.w;
                item.h = item.o.h;
            } else {
                item.src = item.m.src;
                item.w = item.m.w;
                item.h = item.m.h;
            }
        });

        gallery.init();
    };

    var photoswipeParseHash = function photoswipeParseHash() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            // pid=1
            return params;
        }

        var vars = hash.split('&');
        for (var _i6 = 0; _i6 < vars.length; _i6++) {
            if (!vars[_i6]) {
                continue;
            }
            var pair = vars[_i6].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    // select all gallery elements
    var i = 0;
    $gallery.each(function () {
        var $thisGallery = $(this);
        $thisGallery.attr('data-pswp-uid', i + 1);

        $thisGallery.on('click', 'a.nk-gallery-item', function (e) {
            e.preventDefault();
            var index = 0;
            var clicked = this;
            $thisGallery.find('a.nk-gallery-item').each(function (idx) {
                if (this === clicked) {
                    index = idx;
                    return false;
                }
                return true;
            });
            openPhotoSwipe(index, $thisGallery[0]);
        });
        i++;
    });

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, $gallery.get(hashData.gid - 1), true, true);
    }
}

/* Bootstrap Tabs */
function _initPluginTabs() {
    var self = this;
    $wnd.on('shown.bs.tab', function () {
        self.debounceResize();
    });
}

/* Bootstrap Accordions */
function _initPluginAccordions() {
    var self = this;
    $wnd.on('shown.bs.collapse', function () {
        self.debounceResize();
    });

    // REMOVE IT WHEN THIS ISSUE WILL BE FIXED:
    // https://github.com/twbs/bootstrap/issues/18824
    if (typeof $.fn.collapse === 'undefined') {
        return;
    }
    var Util = function (n) {
        function t(n) {
            return {}.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }function e(n) {
            return (n[0] || n).nodeType;
        }function r() {
            return { bindType: u.end, delegateType: u.end, handle: function handle(t) {
                    return n(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0;
                } };
        }function i() {
            if (window.QUnit) return !1;var n = document.createElement("bootstrap");for (var t in s) {
                if (void 0 !== n.style[t]) return { end: s[t] };
            }return !1;
        }function o(t) {
            var e = this,
                r = !1;return n(this).one(d.TRANSITION_END, function () {
                r = !0;
            }), setTimeout(function () {
                r || d.triggerTransitionEnd(e);
            }, t), this;
        }function a() {
            u = i(), n.fn.emulateTransitionEnd = o, d.supportsTransitionEnd() && (n.event.special[d.TRANSITION_END] = r());
        }var u = !1,
            s = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" },
            d = { TRANSITION_END: "bsTransitionEnd", getUID: function getUID(n) {
                do {
                    n += ~ ~(1e6 * Math.random());
                } while (document.getElementById(n));return n;
            }, getSelectorFromElement: function getSelectorFromElement(n) {
                var t = n.getAttribute("data-target");return t || (t = n.getAttribute("href") || "", t = /^#[a-z]/i.test(t) ? t : null), t;
            }, reflow: function reflow(n) {
                new Function("bs", "return bs")(n.offsetHeight);
            }, triggerTransitionEnd: function triggerTransitionEnd(t) {
                n(t).trigger(u.end);
            }, supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(u);
            }, typeCheckConfig: function typeCheckConfig(n, r, i) {
                for (var o in i) {
                    if (i.hasOwnProperty(o)) {
                        var a = i[o],
                            u = r[o],
                            s = void 0;if (s = u && e(u) ? "element" : t(u), !new RegExp(a).test(s)) throw new Error(n.toUpperCase() + ": " + ('Option "' + o + '" provided type "' + s + '" ') + ('but expected type "' + a + '".'));
                    }
                }
            } };return a(), d;
    }(jQuery);

    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var TRANSITION_DURATION = 600;
    var Event = {
        SHOW: 'show' + EVENT_KEY,
        SHOWN: 'shown' + EVENT_KEY,
        HIDE: 'hide' + EVENT_KEY,
        HIDDEN: 'hidden' + EVENT_KEY,
        CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        IN: 'in',
        COLLAPSE: 'collapse',
        COLLAPSING: 'collapsing',
        COLLAPSED: 'collapsed'
    };
    var Selector = {
        ACTIVES: '.panel > .in, .panel > .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'
    };
    $.fn.collapse.Constructor.prototype.show = function show() {
        var _this4 = this;
        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
            return;
        }
        var actives;
        var activesData;
        if (this._parent) {
            actives = $.makeArray($(Selector.ACTIVES, this._parent));
            if (!actives.length) {
                actives = null;
            }
        }
        if (actives) {
            activesData = $(actives).data(DATA_KEY);
            if (activesData && activesData._isTransitioning) {
                return;
            }
        }
        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
            return;
        }
        if (actives) {
            $.fn.collapse.call($(actives), 'hide');
            if (!activesData) {
                $(actives).data(DATA_KEY, null);
            }
        }
        var dimension = this._getDimension();
        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);
        if (this._triggerArray.length) {
            $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }
        this.setTransitioning(true);
        var complete = function complete() {
            $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);
            _this4._element.style[dimension] = '';
            _this4.setTransitioning(false);
            $(_this4._element).trigger(Event.SHOWN);
        };
        if (!Util.supportsTransitionEnd()) {
            complete();
            return;
        }
        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        this._element.style[dimension] = this._element[scrollSize] + 'px';
    };
}

/* Countdown */
function _initPluginCountdown() {
    if (typeof $.fn.countdown === 'undefined' || typeof moment === 'undefined' || typeof moment.tz === 'undefined') {
        return;
    }
    var self = this;

    $('.nk-countdown').each(function () {
        var tz = $(this).attr('data-timezone');
        var end = $(this).attr('data-end');
        end = moment.tz(end, tz).toDate();

        $(this).countdown(end, function (event) {
            $(this).html(event.strftime(self.options.templates.countdown));
        });
    });
}

/* Bootstrap Slider */
function _initPluginSeiyriaBootstrapSlider($context) {
    if (typeof $.fn.bootstrapSlider === 'undefined') {
        return;
    }

    // set labels on slider change
    function setLabels($labels, values) {
        var force = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        for (var k = 0; k < values.newValue.length; k++) {
            if (typeof $labels[k] !== 'undefined' && (force || values.newValue[k] !== values.oldValue[k])) {
                $labels[k].text(values.newValue[k]);
            }
        }
    }

    $('.nk-input-slider').each(function () {
        var $this = $(this);
        var $input = $this.find('input');
        var $labels = [];

        for (var k = 0; k < 3; k++) {
            $labels.push($this.find('.nk-input-slider-value-' + k));
        }

        $input.bootstrapSlider().on('change', function (e) {
            if (e.value && e.value.newValue) {
                setLabels($labels, e.value);
            }
        });

        // set default labels
        setLabels($labels, {
            newValue: $input.bootstrapSlider('getValue')
        }, true);
    });
}

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/
function _initPluginSummernote() {
    if (typeof $.fn.summernote === 'undefined') {
        return;
    }

    $('.nk-summernote').summernote({
        height: 300,
        dialogsInBody: true,
        toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline']], ['fontsize', ['fontsize']], ['color', ['color']], ['insert', ['link', 'picture', 'video']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['misc', ['codeview']]]
    });

    // fix after load popovers are visible
    $('.note-popover').hide();
}

/*------------------------------------------------------------------

  Khaki Class

-------------------------------------------------------------------*/

var GOODGAMES = function () {
    function GOODGAMES() {
        _classCallCheck(this, GOODGAMES);

        this.options = options;
    }

    _createClass(GOODGAMES, [{
        key: 'init',
        value: function init() {
            var self = this;

            // run sidebar first because of may occurs some troubles with other functions
            self.initPluginStickySidebar();

            self.initNavbar();
            self.initNavbarSide();
            self.initNavbarDropEffect1();
            self.initStore();
            self.initCounters();
            self.initNewsBox();
            self.initAnchors();
            self.initEqualHeight();
            self.initVideoBlocks();
            self.initGIF();
            self.initInfoBoxes();
            self.initForms();
            self.initFormsMailChimp();
            self.initAudioPlayer();
            self.initImageSlider();
            self.initFacebook();
            self.initInstagram();
            self.initTwitter();
            self.initDoc();

            // init plugins
            self.initPluginFastClick();
            self.initPluginNano();
            self.initPluginJarallax();
            self.initPluginFlickity();
            self.initPluginPhotoswipe();
            self.initPluginTabs();
            self.initPluginAccordions();
            self.initPluginCountdown();
            self.initPluginSeiyriaBootstrapSlider();
            self.initPluginSummernote();

            return self;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(newOpts) {
            return _setOptions.call(this, newOpts);
        }
    }, {
        key: 'debounceResize',
        value: function debounceResize(func) {
            return _debounceResize.call(this, func);
        }
    }, {
        key: 'throttleScroll',
        value: function throttleScroll(callback) {
            return _throttleScroll.call(this, callback);
        }
    }, {
        key: 'bodyOverflow',
        value: function bodyOverflow(type) {
            return _bodyOverflow.call(this, type);
        }
    }, {
        key: 'isInViewport',
        value: function isInViewport($item, returnRect) {
            return _isInViewport.call(this, $item, returnRect);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo($to, callback) {
            return _scrollTo.call(this, $to, callback);
        }
    }, {
        key: 'initNavbar',
        value: function initNavbar() {
            return _initNavbar.call(this);
        }
    }, {
        key: 'initNavbarSide',
        value: function initNavbarSide() {
            return _initNavbarSide.call(this);
        }
    }, {
        key: 'initNavbarDropEffect1',
        value: function initNavbarDropEffect1() {
            return _initNavbarDropEffect.call(this);
        }
    }, {
        key: 'initCounters',
        value: function initCounters() {
            return _initCounters.call(this);
        }
    }, {
        key: 'initStore',
        value: function initStore() {
            return _initStore.call(this);
        }
    }, {
        key: 'initNewsBox',
        value: function initNewsBox() {
            return _initNewsBox.call(this);
        }
    }, {
        key: 'initAnchors',
        value: function initAnchors() {
            return _initAnchors.call(this);
        }
    }, {
        key: 'initEqualHeight',
        value: function initEqualHeight() {
            return _initEqualHeight.call(this);
        }
    }, {
        key: 'initVideoBlocks',
        value: function initVideoBlocks() {
            return _initVideoBlocks.call(this);
        }
    }, {
        key: 'initGIF',
        value: function initGIF() {
            return _initGIF.call(this);
        }
    }, {
        key: 'initInfoBoxes',
        value: function initInfoBoxes() {
            return _initInfoBoxes.call(this);
        }
    }, {
        key: 'initForms',
        value: function initForms() {
            return _initForms.call(this);
        }
    }, {
        key: 'initFormsMailChimp',
        value: function initFormsMailChimp() {
            return _initFormsMailChimp.call(this);
        }
    }, {
        key: 'initAudioPlayer',
        value: function initAudioPlayer() {
            return _initAudioPlayer.call(this);
        }
    }, {
        key: 'initImageSlider',
        value: function initImageSlider() {
            return _initImageSlider.call(this);
        }
    }, {
        key: 'initFacebook',
        value: function initFacebook() {
            return _initFacebook.call(this);
        }
    }, {
        key: 'initInstagram',
        value: function initInstagram() {
            return _initInstagram.call(this);
        }
    }, {
        key: 'initTwitter',
        value: function initTwitter() {
            return _initTwitter.call(this);
        }
    }, {
        key: 'initDoc',
        value: function initDoc() {
            return _initDoc.call(this);
        }
    }, {
        key: 'initPluginStickySidebar',
        value: function initPluginStickySidebar() {
            return _initPluginStickySidebar.call(this);
        }
    }, {
        key: 'initPluginFastClick',
        value: function initPluginFastClick() {
            return _initPluginFastClick.call(this);
        }
    }, {
        key: 'initPluginNano',
        value: function initPluginNano($context) {
            return _initPluginNano.call(this, $context);
        }
    }, {
        key: 'initPluginJarallax',
        value: function initPluginJarallax($context) {
            return _initPluginJarallax.call(this, $context);
        }
    }, {
        key: 'initPluginFlickity',
        value: function initPluginFlickity($context) {
            return _initPluginFlickity.call(this, $context);
        }
    }, {
        key: 'initPluginPhotoswipe',
        value: function initPluginPhotoswipe($context) {
            return _initPluginPhotoswipe.call(this, $context);
        }
    }, {
        key: 'initPluginTabs',
        value: function initPluginTabs($context) {
            return _initPluginTabs.call(this, $context);
        }
    }, {
        key: 'initPluginAccordions',
        value: function initPluginAccordions($context) {
            return _initPluginAccordions.call(this, $context);
        }
    }, {
        key: 'initPluginCountdown',
        value: function initPluginCountdown($context) {
            return _initPluginCountdown.call(this, $context);
        }
    }, {
        key: 'initPluginSeiyriaBootstrapSlider',
        value: function initPluginSeiyriaBootstrapSlider($context) {
            return _initPluginSeiyriaBootstrapSlider.call(this, $context);
        }
    }, {
        key: 'initPluginSummernote',
        value: function initPluginSummernote($context) {
            return _initPluginSummernote.call(this, $context);
        }
    }]);

    return GOODGAMES;
}();

/*------------------------------------------------------------------

  Init GoodGames

-------------------------------------------------------------------*/


window.GoodGames = new GOODGAMES();
}());
