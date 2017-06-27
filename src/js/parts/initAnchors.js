import { $, $wnd, $doc, wndH } from "./_utility";

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function initAnchors () {
    const self = this;

    // click on anchors
    let $leftSideNav = $('.nk-navbar-left-side');
    let $rightSideNav = $('.nk-navbar-right-side');
    function closeNavs () {
        self.closeSide($leftSideNav);
        self.closeSide($rightSideNav);
        self.closeFullscreenNavbar();
    }
    $doc.on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function (e) {
        let isHash = this.hash;
        let isURIsame = this.baseURI === window.location.href;

        if(isHash && isURIsame) {
            let $hashBlock = $(isHash);
            let hash = isHash.replace(/^#/, '');
            if($hashBlock.length || hash === 'top' || hash === 'bottom') {
                // close navigations
                closeNavs();

                // add hash to address bar
                if($hashBlock.length) {
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
    let $anchorItems = $('.nk-navbar .nk-nav > li > a[href*="#"]');
    let anchorBlocks = [];
    function hashInArray (item) {
        for(let k = 0; k < anchorBlocks.length; k++) {
            if(anchorBlocks[k].hash === item) {
                return k;
            }
        }
        return false;
    }
    // get all anchors + blocks on the page
    $anchorItems.each(function () {
        let hash = this.hash.replace(/^#/, '');
        let $item = $(this).parent();
        let $block = $('#' + hash);

        if(hash && $block.length || hash === 'top') {
            let inArray = hashInArray(hash);
            if(inArray === false) {
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
    function updateAnchorItemsPositions () {
        for(let k = 0; k < anchorBlocks.length; k++) {
            let item = anchorBlocks[k];
            let blockTop = 0;
            let blockH = wndH;
            if(item.$block.length) {
                blockTop = item.$block.offset().top;
                blockH = item.$block.innerHeight();
            }
            item.activate = blockTop - wndH / 2;
            item.deactivate = blockTop + blockH - wndH / 2;
        }
    }
    function setAnchorActiveItem (type, ST) {
        for(let k = 0; k < anchorBlocks.length; k++) {
            let item = anchorBlocks[k];
            let active = ST >= item.activate && ST < item.deactivate;
            item.$item[active ? 'addClass' : 'removeClass']('active');
        }
    }
    if(anchorBlocks.length) {
        updateAnchorItemsPositions();
        setAnchorActiveItem('static', $wnd.scrollTop());
        self.throttleScroll(setAnchorActiveItem);
        self.debounceResize(updateAnchorItemsPositions);
    }
}

export { initAnchors };
