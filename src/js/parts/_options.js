/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
let options = {
    scrollToAnchorSpeed: 700,

    templates: {
        secondaryNavbarBackItem: 'Back',

        plainVideoIcon: '<span class="nk-video-icon"><span class="fa fa-play pl-5"></span></span>',
        plainVideoLoadIcon: '<span class="nk-video-icon"><span class="nk-loading-icon"></span></span>',

        audioPlainButton:
            `<div class="nk-audio-plain-play-pause">
                <span class="nk-audio-plain-play">
                    <span class="ion-play ml-3"></span>
                </span>
                <span class="nk-audio-plain-pause">
                    <span class="ion-pause"></span>
                </span>
            </div>`,

        instagram:
            `<div class="col-xs-4">
                <a href="{{link}}" target="_blank">
                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">
                </a>
            </div>`,
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter:
            `<div class="nk-twitter">
                <span class="nk-twitter-icon fa fa-twitter"></span>
                <div class="nk-twitter-name">
                      <a href="https://twitter.com/{{screen_name}}" target="_blank">@{{screen_name}}</a>
                </div>
                <div class="nk-twitter-date">
                    <span>{{date}}</span>
                </div>
                <div class="nk-twitter-text">
                   {{tweet}}
                </div>
            </div>`,
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown:
            `<div class="nk-hexagon">
                <div class="nk-hexagon-inner"></div>
                <span>%D</span>
                Days
            </div>
            <div class="nk-hexagon">
                <div class="nk-hexagon-inner"></div>
                <span>%H</span>
                Hours
            </div>
            <div class="nk-hexagon">
                <div class="nk-hexagon-inner"></div>
                <span>%M</span>
                Minutes
            </div>
            <div class="nk-hexagon">
                <div class="nk-hexagon-inner"></div>
                <span>%S</span>
                Seconds
            </div>`
    }
};

export { options };
