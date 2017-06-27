import { $, tween } from "./_utility";

/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/
function initNavbarDropEffect1 () {
    const self = this;
    let $navbars = $('.nk-navbar-side, .nk-navbar-full');

    // add back item for dropdowns
    $navbars.find('.dropdown').prepend('<li class="bropdown-back"><a href="#">' + self.options.templates.secondaryNavbarBackItem + '</a></li>');

    // change height of opened dropdown
    function updateSideNavDropdown ($item) {
        let $nav = $item.parents('.nk-navbar:eq(0)');
        let $khNav = $nav.find('.nk-nav');
        let $drop = $nav.find('.nk-drop-item.open > .dropdown:not(.closed)');
        let $nano = $item.parents('.nano:eq(0)');
        let $nanoCont = $nano.children('.nano-content');
        let $rows = $item.parents('.nk-nav-row:eq(0)').siblings('.nk-nav-row');
        if($drop.length) {
            let dropHeight = $drop.innerHeight();

            // vertical center for dropdown
            if($nav.hasClass('nk-navbar-align-center')) {
                $drop.css({
                    top: 0
                });

                let nanoHeight = $nano.innerHeight();
                let nanoNavRowHeight = nanoHeight;
                let nanoTop = $nano.offset().top;
                let dropTop = $drop.offset().top;

                // remove additional rows size
                if($rows.length) {
                    $rows.each(function () {
                        nanoNavRowHeight = nanoNavRowHeight - $(this).innerHeight();
                    });
                }

                if(dropHeight < nanoNavRowHeight) {
                    let top = nanoTop - dropTop - $nanoCont.scrollTop();
                    top += (nanoHeight - dropHeight) / 2;

                    $drop.css({
                        top: top
                    });
                }
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
    function toggleSubmenu (open, $drop) {
        let $newItems = $drop.find('> .dropdown > li > a');
        let $oldItems = $drop.parent().find('> li > a');

        if(open) {
            $drop.addClass('open').parent().addClass('closed');
        } else {
            $drop.removeClass('open').parent().removeClass('closed');

            let tmp = $newItems;
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
        }, 0.05, () => {
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

export { initNavbarDropEffect1 };
