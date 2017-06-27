
import { options } from './parts/_options';
import { debounceResize, throttleScroll, bodyOverflow, isInViewport, scrollTo } from './parts/_utility';
import { setOptions } from './parts/setOptions';
import { initNavbar } from './parts/initNavbar';
import { initNavbarSide } from './parts/initNavbarSide';
import { initNavbarDropEffect1 } from './parts/initNavbarDropEffect1';
import { initCounters } from './parts/initCounters';
import { initStore } from './parts/initStore';
import { initNewsBox } from './parts/initNewsBox';
import { initAnchors } from './parts/initAnchors';
import { initEqualHeight } from './parts/initEqualHeight';
import { initVideoBlocks } from './parts/initVideoBlocks';
import { initGIF } from './parts/initGIF';
import { initInfoBoxes } from './parts/initInfoBoxes';
import { initForms } from './parts/initForms';
import { initFormsMailChimp } from './parts/initFormsMailChimp';
import { initAudioPlayer } from './parts/initAudioPlayer';
import { initImageSlider } from './parts/initImageSlider';
import { initFacebook } from './parts/initFacebook';
import { initInstagram } from './parts/initInstagram';
import { initTwitter } from './parts/initTwitter';
import { initDoc } from './parts/initDoc';

/* Plugins */
import { initPluginStickySidebar } from './parts/initPluginStickySidebar';
import { initPluginFastClick } from './parts/initPluginFastClick';
import { initPluginNano } from './parts/initPluginNano';
import { initPluginJarallax } from './parts/initPluginJarallax';
import { initPluginFlickity } from './parts/initPluginFlickity';
import { initPluginPhotoswipe } from './parts/initPluginPhotoswipe';
import { initPluginTabs } from './parts/initPluginTabs';
import { initPluginAccordions } from './parts/initPluginAccordions';
import { initPluginCountdown } from './parts/initPluginCountdown';
import { initPluginSeiyriaBootstrapSlider } from './parts/initPluginSeiyriaBootstrapSlider';
import { initPluginSummernote } from './parts/initPluginSummernote';


/*------------------------------------------------------------------

  Khaki Class

-------------------------------------------------------------------*/
class GOODGAMES {
    constructor () {
        this.options = options;
    }

    init () {
        let self = this;

        // run sidebar first because of may occurs some troubles with other functions
        self.initPluginStickySidebar();

        self.initNavbar();
        self.initNavbarSide();
        self.initNavbarDropEffect1();
        self.initStore();
        self.initCounters();
        self.initNewsBox();
        self.initAnchors();
        self.initEqualHeight();
        self.initVideoBlocks();
        self.initGIF();
        self.initInfoBoxes();
        self.initForms();
        self.initFormsMailChimp();
        self.initAudioPlayer();
        self.initImageSlider();
        self.initFacebook();
        self.initInstagram();
        self.initTwitter();
        self.initDoc();

        // init plugins
        self.initPluginFastClick();
        self.initPluginNano();
        self.initPluginJarallax();
        self.initPluginFlickity();
        self.initPluginPhotoswipe();
        self.initPluginTabs();
        self.initPluginAccordions();
        self.initPluginCountdown();
        self.initPluginSeiyriaBootstrapSlider();
        self.initPluginSummernote();

        return self;
    }
    setOptions (newOpts) {
        return setOptions.call(this, newOpts);
    }
    debounceResize (func) {
        return debounceResize.call(this, func);
    }
    throttleScroll (callback) {
        return throttleScroll.call(this, callback);
    }
    bodyOverflow (type) {
        return bodyOverflow.call(this, type);
    }
    isInViewport ($item, returnRect) {
        return isInViewport.call(this, $item, returnRect);
    }
    scrollTo ($to, callback) {
        return scrollTo.call(this, $to, callback);
    }
    initNavbar () {
        return initNavbar.call(this);
    }
    initNavbarSide () {
        return initNavbarSide.call(this);
    }
    initNavbarDropEffect1 () {
        return initNavbarDropEffect1.call(this);
    }
    initCounters () {
        return initCounters.call(this);
    }
    initStore () {
        return initStore.call(this);
    }
    initNewsBox () {
        return initNewsBox.call(this);
    }
    initAnchors () {
        return initAnchors.call(this);
    }
    initEqualHeight () {
        return initEqualHeight.call(this);
    }
    initVideoBlocks () {
        return initVideoBlocks.call(this);
    }
    initGIF () {
        return initGIF.call(this);
    }
    initInfoBoxes () {
        return initInfoBoxes.call(this);
    }
    initForms () {
        return initForms.call(this);
    }
    initFormsMailChimp () {
        return initFormsMailChimp.call(this);
    }
    initAudioPlayer () {
        return initAudioPlayer.call(this);
    }
    initImageSlider () {
        return initImageSlider.call(this);
    }
    initFacebook () {
        return initFacebook.call(this);
    }
    initInstagram () {
        return initInstagram.call(this);
    }
    initTwitter () {
        return initTwitter.call(this);
    }
    initDoc () {
        return initDoc.call(this);
    }


    initPluginStickySidebar () {
        return initPluginStickySidebar.call(this);
    }
    initPluginFastClick () {
        return initPluginFastClick.call(this);
    }
    initPluginNano ($context) {
        return initPluginNano.call(this, $context);
    }
    initPluginJarallax ($context) {
        return initPluginJarallax.call(this, $context);
    }
    initPluginFlickity ($context) {
        return initPluginFlickity.call(this, $context);
    }
    initPluginPhotoswipe ($context) {
        return initPluginPhotoswipe.call(this, $context);
    }
    initPluginTabs ($context) {
        return initPluginTabs.call(this, $context);
    }
    initPluginAccordions ($context) {
        return initPluginAccordions.call(this, $context);
    }
    initPluginCountdown ($context) {
        return initPluginCountdown.call(this, $context);
    }
    initPluginSeiyriaBootstrapSlider ($context) {
        return initPluginSeiyriaBootstrapSlider.call(this, $context);
    }
    initPluginSummernote ($context) {
        return initPluginSummernote.call(this, $context);
    }
}


/*------------------------------------------------------------------

  Init GoodGames

-------------------------------------------------------------------*/
window.GoodGames = new GOODGAMES();
