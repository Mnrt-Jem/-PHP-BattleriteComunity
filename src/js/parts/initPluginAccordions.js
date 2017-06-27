import { $, $wnd } from "./_utility";

/* Bootstrap Accordions */
function initPluginAccordions () {
    const self = this;
    $wnd.on('shown.bs.collapse', () => {
        self.debounceResize();
    });

    // REMOVE IT WHEN THIS ISSUE WILL BE FIXED:
    // https://github.com/twbs/bootstrap/issues/18824
    if(typeof $.fn.collapse === 'undefined') {
        return;
    }
    var Util=function(n){function t(n){return{}.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function e(n){return(n[0]||n).nodeType}function r(){return{bindType:u.end,delegateType:u.end,handle:function(t){return n(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}}}function i(){if(window.QUnit)return!1;var n=document.createElement("bootstrap");for(var t in s)if(void 0!==n.style[t])return{end:s[t]};return!1}function o(t){var e=this,r=!1;return n(this).one(d.TRANSITION_END,function(){r=!0}),setTimeout(function(){r||d.triggerTransitionEnd(e)},t),this}function a(){u=i(),n.fn.emulateTransitionEnd=o,d.supportsTransitionEnd()&&(n.event.special[d.TRANSITION_END]=r())}var u=!1,s={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},d={TRANSITION_END:"bsTransitionEnd",getUID:function(n){do n+=~~(1e6*Math.random());while(document.getElementById(n));return n},getSelectorFromElement:function(n){var t=n.getAttribute("data-target");return t||(t=n.getAttribute("href")||"",t=/^#[a-z]/i.test(t)?t:null),t},reflow:function(n){new Function("bs","return bs")(n.offsetHeight)},triggerTransitionEnd:function(t){n(t).trigger(u.end)},supportsTransitionEnd:function(){return Boolean(u)},typeCheckConfig:function(n,r,i){for(var o in i)if(i.hasOwnProperty(o)){var a=i[o],u=r[o],s=void 0;if(s=u&&e(u)?"element":t(u),!new RegExp(a).test(s))throw new Error(n.toUpperCase()+": "+('Option "'+o+'" provided type "'+s+'" ')+('but expected type "'+a+'".'))}}};return a(),d}(jQuery);

    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var TRANSITION_DURATION = 600;
    var Event = {
        SHOW: 'show' + EVENT_KEY,
        SHOWN: 'shown' + EVENT_KEY,
        HIDE: 'hide' + EVENT_KEY,
        HIDDEN: 'hidden' + EVENT_KEY,
        CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        IN: 'in',
        COLLAPSE: 'collapse',
        COLLAPSING: 'collapsing',
        COLLAPSED: 'collapsed'
    };
    var Selector = {
        ACTIVES: '.panel > .in, .panel > .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'
    };
    $.fn.collapse.Constructor.prototype.show = function show () {
        var _this4 = this;
        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
            return;
        }
        var actives;
        var activesData;
        if (this._parent) {
            actives = $.makeArray($(Selector.ACTIVES, this._parent));
            if (!actives.length) {
                actives = null;
            }
        }
        if (actives) {
            activesData = $(actives).data(DATA_KEY);
            if (activesData && activesData._isTransitioning) {
                return;
            }
        }
        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
            return;
        }
        if (actives) {
            $.fn.collapse.call($(actives), 'hide');
            if (!activesData) {
                $(actives).data(DATA_KEY, null);
            }
        }
        var dimension = this._getDimension();
        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);
        if (this._triggerArray.length) {
            $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }
        this.setTransitioning(true);
        var complete = function complete () {
            $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);
            _this4._element.style[dimension] = '';
            _this4.setTransitioning(false);
            $(_this4._element).trigger(Event.SHOWN);
        };
        if (!Util.supportsTransitionEnd()) {
            complete();
            return;
        }
        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        this._element.style[dimension] = this._element[scrollSize] + 'px';
    };
}

export { initPluginAccordions };
