import { $ } from "./_utility";

/* Jarallax */
function initPluginJarallax () {
    if(typeof $.fn.jarallax === 'undefined') {
        return;
    }
    const self = this;

    // video backgrounds
    $('.bg-video[data-video]').each(function () {
        $(this).attr('data-jarallax-video', $(this).attr('data-video'));
        $(this).removeAttr('data-video');
    });

    // primary parallax
    $('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed
    });

    // video without parallax
    $('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1
    });
}

export { initPluginJarallax };
