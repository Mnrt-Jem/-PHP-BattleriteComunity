import { $, $doc, $body, tween, wndW, wndH } from "./_utility";

/*------------------------------------------------------------------

  Init Video Blocks

-------------------------------------------------------------------*/
function initVideoBlocks () {
    if(typeof window.VideoWorker === 'undefined') {
        return;
    }
    const self = this;

    // init plain video
    function addPlainPlayButton ($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton ($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon);
    }
    $('.nk-plain-video[data-video]').each(function () {
        let $plainCont = $(this);
        let $plainIframe;
        let url = $(this).attr('data-video');
        let api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1
        });

        if(api && api.isValid()) {
            var loaded = 0;
            api.getIframe((iframe) => {
                // add iframe
                $plainIframe = $(iframe);
                let $parent = $plainIframe.parent();
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
                $plainCont.on('click', () => {
                    api.play();

                    // add loading button
                    if(!loaded) {
                        addPlainLoadButton($plainCont);
                    }
                });
            });
            api.getImageURL((imgSrc) => {
                $plainCont.css('background-image', 'url("' + imgSrc + '")');
            });
            api.on('play', () => {
                tween.to($plainIframe, 0.5, {
                    opacity: 1,
                    display: 'block',
                    onComplete () {
                        // add play button
                        if(!loaded) {
                            addPlainPlayButton($plainCont);
                            loaded = 1;
                        }
                    }
                });

                // pause audio
                if(typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
            api.on('pause', () => {
                tween.to($plainIframe, 0.5, {
                    opacity: 0,
                    display: 'none'
                });
            });
        }
    });
}

export { initVideoBlocks };
