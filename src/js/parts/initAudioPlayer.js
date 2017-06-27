import { $, $wnd, isIOs } from "./_utility";

/*------------------------------------------------------------------

 Init Audio Player

 -------------------------------------------------------------------*/
function initAudioPlayer () {
    if(typeof soundManager === 'undefined') {
        return;
    }

    const _self = this;
    let progressBusy = false; // busy when user drag progress bar

    /* Plain audio players */
    let $playersPlain = $('.nk-audio-plain');
    // add play and pause buttons
    $playersPlain.prepend(_self.options.templates.audioPlainButton);
    let PlayersPlain = function ($item) {
        let self = this;
        self.$item = $item;
        self.url = $item.attr('data-src');
        self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
        self.$progress = $item.find('.nk-audio-progress-current');

        self.$timer = $item.find('.nk-audio-plain-duration');
        self.$timer.attr('data-duration', self.$timer.text());

        function onPlay () {
            $item.addClass('nk-audio-plain-playing');
        }
        function onStop () {
            $item.removeClass('nk-audio-plain-playing');
            self.$timer = $item.find('.nk-audio-plain-duration');
            self.$timer.text(self.$timer.attr('data-duration'));
        }
        self.api = soundManager.createSound({
            volume: 100,
            whileplaying () {
                self.step();
            },
            onplay: onPlay,
            onresume: onPlay,
            onpause: onStop,
            onstop: onStop,
            onload: function (ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            }
        });

        self.$playPauseBtn.on('click', () => {
            if(!self.api.paused && self.api.url) {
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
        play: function () {
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
        pause () {
            // Puase the sound.
            soundManager.pauseAll();
        },
        /**
         * Seek to a new position in the currently playing track.
         * @param  {Number} per Percentage through the song to skip.
         */
        seek: function (per) {
            this.api.setPosition(this.api.duration * per);
        },
        /**
         * The step called within requestAnimationFrame to update the playback position.
         */
        step: function () {
            let self = this;
            // Determine our current seek position.
            let seek = self.api.position || 0;
            self.progress = seek / self.api.duration;
            self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

            if(!progressBusy) {
                self.$progress[0].style.width = (self.progress * 100 || 0) + '%';
            }
        },

        /**
         * Format the time from seconds to M:SS.
         * @param  {Number} secs Seconds to format.
         * @return {String}      Formatted time.
         */
        formatTime (msec) {
            let secs = Math.round(msec / 1000) || 0;
            let minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            let seconds = secs - minutes * 60;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    };

    // progress
    if(typeof Hammer !== 'undefined') {
        let $progresses = $playersPlain.find('.nk-audio-progress');
        $progresses.each(function () {
            let $curProgressCont = $(this);
            let $curProgres = $curProgressCont.children();
            let curApi;
            let progressW;
            let progressCurW;
            let progressStart = false;
            let HammerProgress = new Hammer.Manager($curProgressCont[0]);
            HammerProgress.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0
            }));
            HammerProgress.add(new Hammer.Press({
                time: 1
            }));
            HammerProgress.on('pan press pressup', (e) => {
                // start
                if(e.type === 'press' || progressStart === false) {
                    progressBusy = true;
                    progressW = $curProgressCont.width();
                    progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
                    $curProgressCont.addClass('hover');
                }

                // each
                progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
                $curProgres[0].style.width = progressCurW * 100 + '%';

                // end
                if(e.isFinal || e.type === 'pressup') {
                    if(!curApi) {
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

    soundManager.onready(() => {
        if($playersPlain.length) {
            $playersPlain.each(function () {
                this.audioAPI = new PlayersPlain($(this));
            });
        }
    });
}

export { initAudioPlayer };
