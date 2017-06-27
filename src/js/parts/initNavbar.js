import { $, tween, $wnd, wndW, pageBorderSize } from "./_utility";

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar () {
    const self = this;
    let $navbarTop = $('.nk-navbar-top');

    // add mobile navbar
    let $mobileNavItems = $('[data-nav-mobile]');
    if($mobileNavItems.length) {
        let $mobileNav;
        let $nav;

        $mobileNavItems.each(function () {
            $mobileNav = $($(this).attr('data-nav-mobile'));
            if($nav) {
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
            let $drop = $(this).children('ul').addClass('dropdown');

            // fix mega menu columns
            $drop.find('> li > label').each(function () {
                $(this).next().addClass('dropdown');
                $(this).parent().addClass('nk-drop-item');
                $(this).replaceWith($('<a href="#"></a>').html($(this).html()));
            });

            $(this).replaceWith($drop);
        });
        $nav.find('.nk-mega-item').removeClass('nk-mega-item');
    }

    // sticky navbar
    let navbarTop = $navbarTop.length ? $navbarTop.offset().top - pageBorderSize : 0;
    // fake hidden navbar to prevent page jumping on stick
    let $navbarFake = $('<div>').hide();
    function onScrollNav () {
        let stickyOn = $wnd.scrollTop() >= navbarTop;

        if(stickyOn) {
            $navbarTop.addClass('nk-navbar-fixed');
            $navbarFake.show();
        }
        else {
            $navbarTop.removeClass('nk-navbar-fixed');
            $navbarFake.hide();
        }
    }
    if($navbarTop.hasClass('nk-navbar-sticky')) {
        $wnd.on('scroll resize', onScrollNav);
        onScrollNav();

        $navbarTop.after($navbarFake);
        self.debounceResize(() => {
            $navbarFake.height($navbarTop.innerHeight());
        });
    }

    // correct dropdown position
    function correctDropdown ($item) {
        if($item.parent().is('.nk-nav')) {
            let $dropdown = $item.children('.dropdown');
            let $parent = $item.parents('.nk-navbar:eq(0)');
            let isRight = $dropdown.css('right') !== 'auto';
            let css = {
                marginLeft: '',
                marginRight: '',
                marginTop: 0,
                display: 'block'
            };

            $dropdown.css(css);

            let rect = $dropdown[0].getBoundingClientRect();
            let itemRect = $item[0].getBoundingClientRect();

            // move dropdown from left corner
            if(rect.left - pageBorderSize < 0) {
                css.marginLeft = pageBorderSize - rect.left;
            }

            // move dropdown from right corner
            else if(rect.right > wndW - pageBorderSize * 2) {
                css.marginLeft = wndW - pageBorderSize - rect.right;
            }

            // check if dropdown not under item
            let currentLeftPost = rect.left + (css.marginLeft || 0);
            if(currentLeftPost > itemRect.left) {
                css.marginLeft = (css.marginLeft || 0) - (currentLeftPost - itemRect.left);
            }

            // change to margin-right. In some cases left margin isn't working, for ex. in mega menu
            if(isRight) {
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
    function closeSubmenu ($item) {
        if($item.length) {
            $item.removeClass('open');
            tween.to($item.children('.dropdown'), 0.3, {
                opacity: 0,
                display: 'none'
            });
            $wnd.trigger('nk-closed-submenu', [$item]);
        }
    }
    function openSubmenu ($item) {
        if(!$item.hasClass('open')) {
            correctDropdown($item);
            tween.to($item.children('.dropdown'), 0.3, {
                opacity: 1,
                display: 'block'
            });
            $item.addClass('open');
            $wnd.trigger('nk-opened-submenu', [$item]);
        }
    }
    let dropdownTimeout;
    $navbarTop.on('mouseenter', 'li.nk-drop-item', function () {
        let $item = $(this);
        let $openedSiblings = $item.siblings('.open')
                            .add($item.siblings().find('.open'))
                            .add($item.parents('.nk-nav:eq(0)').siblings().find('.open'))
                            .add($item.parents('.nk-nav:eq(0)').siblings('.open'))
                            .add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    }).on('mouseleave', 'li.nk-drop-item', function () {
        let $item = $(this);
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => {
            closeSubmenu($item);
        }, 200);
    });
    $navbarTop.on('mouseleave', () => {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => {
            closeSubmenu($navbarTop.find('.open'));
        }, 400);
    });

    // hide / show
    // add / remove solid color
    let $autohide_nav = $navbarTop.filter('.nk-navbar-autohide');
    self.throttleScroll((type, scroll) => {
        let start = 400;
        let hideClass = 'nk-onscroll-hide';
        let showClass = 'nk-onscroll-show';

        // hide / show
        if(type === 'down' && scroll > start) {
            $autohide_nav.removeClass(showClass).addClass(hideClass);
        } else if(type === 'up' || type === 'end' || type === 'start') {
            $autohide_nav.removeClass(hideClass).addClass(showClass);
        }

        // add solid color
        if($navbarTop.hasClass('nk-navbar-transparent')) {
            $navbarTop[(scroll > 70 ? 'add' : 'remove') + 'Class']('nk-navbar-solid');
        }
    });
}

export { initNavbar };
