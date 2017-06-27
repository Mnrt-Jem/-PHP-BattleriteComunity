import { $, $body } from "./_utility";

/* PhotoSwipe */
function initPluginPhotoswipe () {
    let $gallery = $('.nk-popup-gallery');
    if(typeof PhotoSwipe === 'undefined' || !$gallery.length) {
        return;
    }

    // prepare photoswipe markup
    let markup =
        `<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="pswp__bg"></div>
          <div class="pswp__scroll-wrap">
            <div class="pswp__container">
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
            </div>
            <div class="pswp__ui pswp__ui--hidden">
              <div class="pswp__top-bar">
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div class="pswp__preloader">
                  <div class="pswp__preloader__icn">
                    <div class="pswp__preloader__cut">
                      <div class="pswp__preloader__donut"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div>
              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
              <div class="pswp__caption">
                <div class="pswp__caption__center">
                </div>
              </div>
            </div>
          </div>
        </div>`;
    $body.append(markup);

    // init code
    let parseThumbnailElements = function (el) {
        let thumbElements = $(el).find('a.nk-gallery-item'),
            items = [],
            childElements,
            descrElement,
            size,
            item;

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

            if(descrElement.length) {
                item.title = descrElement.html();
            }

            // save link to element for getThumbBoundsFn
            item.el = this;

            if(childElements.length > 0) {
                // thumbnail url
                item.msrc = item.src;
                if(childElements.length > 1) {
                    item.title = $(childElements).filter('.photoswipe-description').html();
                }
            }

            let mediumSrc = this.getAttribute('data-med') || item.src;
            if(mediumSrc) {
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

    let openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        let pswpElement = $('.pswp')[0],
            gallery,
            options,
            items;

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
            addCaptionHTMLFn: function (item, captionEl) {
                // item      - slide object
                // captionEl - caption DOM element
                // isFake    - true when content is added to fake caption container
                //             (used to get size of next or previous caption)

                if(!item.title && !item.author) {
                    captionEl.children[0].innerHTML = '';
                    return false;
                }
                let caption = '';
                if(item.title) {
                    caption += item.title;
                }
                if(item.author) {
                    if(item.title) {
                        caption += '<br>';
                    }
                    caption += '<small>' + item.author + '</small>';
                }
                captionEl.children[0].innerHTML = caption;
                return true;
            },

            galleryUID: galleryElement.getAttribute('data-pswp-uid')
        };

        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(let j = 0; j < items.length; j++) {
                    if(items[j].pid === index) {
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
        if(isNaN(options.index)) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        // see: http://photoswipe.com/documentation/responsive-images.html
        let realViewportWidth,
            useLargeImages = false,
            firstResize = true,
            imageSrcWillChange;

        gallery.listen('beforeResize', function () {
            let dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;

            if(realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || screen.width > 1200 ) {
                if(!useLargeImages) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }
            } else {
                if(useLargeImages) {
                    useLargeImages = false;
                    imageSrcWillChange = true;
                }
            }

            if(imageSrcWillChange && !firstResize) {
                gallery.invalidateCurrItems();
            }

            if(firstResize) {
                firstResize = false;
            }

            imageSrcWillChange = false;
        });

        gallery.listen('gettingData', function (idx, item) {
            if( useLargeImages ) {
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

    let photoswipeParseHash = function () {
        let hash = window.location.hash.substring(1),
            params = {};

        if(hash.length < 5) { // pid=1
            return params;
        }

        let vars = hash.split('&');
        for (let i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            let pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    // select all gallery elements
    let i = 0;
    $gallery.each(function () {
        let $thisGallery = $(this);
        $thisGallery.attr('data-pswp-uid', i + 1);

        $thisGallery.on('click', 'a.nk-gallery-item', function (e) {
            e.preventDefault();
            let index = 0;
            let clicked = this;
            $thisGallery.find('a.nk-gallery-item').each(function (idx) {
                if(this === clicked) {
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
    let hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, $gallery.get(hashData.gid - 1), true, true);
    }
}

export { initPluginPhotoswipe };
