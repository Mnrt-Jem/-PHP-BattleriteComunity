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

if (typeof GoodGames !== 'undefined') {
    GoodGames.setOptions(options);
    GoodGames.init();
}
}());
