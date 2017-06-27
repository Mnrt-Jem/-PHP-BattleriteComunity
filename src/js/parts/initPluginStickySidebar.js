import { $ } from "./_utility";

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function initPluginStickySidebar () {
    if(typeof $.fn.stick_in_parent === 'undefined') {
        return;
    }

    $('.nk-sidebar-sticky').each(function () {
        $(this).wrapInner('<div>').children().stick_in_parent({
            parent: $(this).parent()
        });
    });
}

export { initPluginStickySidebar };
