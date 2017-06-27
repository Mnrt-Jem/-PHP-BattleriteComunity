import { $, tween } from "./_utility";

/*------------------------------------------------------------------

  Init Documentation

-------------------------------------------------------------------*/
function initDoc () {
    const self = this;
    let $menu = $('.nk-doc-links');
    let $firstBlocks = $('.nk-doc > .nk-doc-item');
    let $childBlocks = $('.nk-doc > .nk-doc-item > .nk-doc-item');
    let $blocks = $firstBlocks.add($childBlocks);
    let blocks = [];

    if(!$blocks.length) {
        return;
    }

    // get block by attr
    function getBlocksBy (by, val, getFrom) {
        let result = [];
        getFrom = getFrom || blocks;
        for(let k = 0; k < getFrom.length; k++) {
            if(getFrom[k] && typeof getFrom[k][by] !== 'undefined' && getFrom[k][by] === val) {
                result.push(getFrom[k]);
            }
        }
        return result;
    }

    // prepare links
    let uniqID = 0;
    let hashID = 0;
    function prepareLinks ($block) {
        if(!hashID) {
            uniqID++;
        }
        let title = $block.find('> h2, > h3').eq(0).text();
        let hash = 'doc-' + title.replace(/\s+/g, '-').toLowerCase() + (hashID ? '-' + hashID : '');

        if(getBlocksBy('hash', hash).length) {
            hashID++;
            return prepareLinks($block);
        }

        $block.attr('data-id', uniqID);

        // add parent value if this is child
        let parent = false;
        let $parent = $block.parents('.nk-doc-item:eq(0)');
        if($parent.length) {
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
        let block = prepareLinks($(this));
        blocks.push(block);
    });
    $childBlocks.each(function () {
        let block = prepareLinks($(this));
        blocks.push(block);
    });

    // activate block
    let firstRun = 1;
    function activeBlock (id) {
        // add hash
        let selectedBlock = getBlocksBy('id', id)[0];
        let issetChilds = getBlocksBy('parent', id)[0];
        if(issetChilds) {
            activeBlock(issetChilds.id);
            return;
        }
        if(selectedBlock) {
            // hide all blocks
            $blocks.hide();

            // activate menu item
            $menu.find('[data-id]').removeClass('active');
            $menu.find('[data-id=' + id + ']').addClass('active');

            // activate parent menu item
            let parentBlock = getBlocksBy('id', selectedBlock.parent)[0];
            if(parentBlock) {
                $menu.find('[data-id=' + selectedBlock.parent + ']').addClass('active');

                // show parent
                parentBlock.$block.show();
            }

            // show submenu
            let $sub_menus = $menu.find('[data-id] + ul');
            $sub_menus.each(function () {
                let $this = $(this);
                let isActive = !!$this.find('[data-id].active').length;
                let isOpened = $this.hasClass('opened');

                // open
                if(isActive && !isOpened) {
                    $this.css('height', '');
                    $this.show();
                    let h = $this.innerHeight();
                    $this.hide();
                    tween.set($this, {
                        height: 0
                    });
                    tween.to($this, 0.4, {
                        height: h,
                        display: 'block',
                        onComplete: function () {
                            self.debounceResize();
                        }
                    });
                    $this.addClass('opened');

                // close
                }

                if(!isActive && isOpened) {
                    tween.to($this, 0.4, {
                        height: 0,
                        display: 'none',
                        onComplete: function () {
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
            if(!firstRun) {
                self.debounceResize();
                self.scrollTo($('.nk-header-title').next());
            }
            firstRun = 0;
        }
    }

    // create side menu
    let menuTemplate = '';
    for(let k = 0; k < blocks.length; k++) {
        if(blocks[k].parent === false) {
            let childs = getBlocksBy('parent', blocks[k].id);

            menuTemplate += '<li><div data-id="' + blocks[k].id + '">' + blocks[k].title + (childs.length ? ' <sup>[' + childs.length + ']</sup>' : '') + '</div>';

            // add childs
            if(childs.length) {
                menuTemplate += '<ul>';
                for(let i = 0; i < childs.length; i++) {
                    menuTemplate += '<li><div data-id="' + childs[i].id + '">' + childs[i].title + '</div>';
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
    if(location.hash) {
        let curBlock = getBlocksBy('hash', location.hash.replace('#', ''));
        if(curBlock[0]) {
            activeBlock(curBlock[0].id);
        }
    } else {
        activeBlock(blocks[0].id);
    }
}

export { initDoc };
