import { $, wndW, wndH } from "./_utility";

/* Flickity */
function initPluginFlickity () {
    if(typeof window.Flickity === 'undefined') {
        return;
    }

    const self = this;

    function addDefaultArrows ($carousel) {
        $('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="ion-ios-arrow-back"></span></div>').on('click', () => {
            $carousel.flickity('previous');
        }).appendTo($carousel);

        $('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="ion-ios-arrow-forward"></span></div>').on('click', () => {
            $carousel.flickity('next');
        }).appendTo($carousel);
    }

    // prevent click event fire when drag carousel
    function noClickEventOnDrag ($carousel) {
        $carousel.on('dragStart', function () {
            $(this).find('.flickity-viewport').addClass('is-dragging');
        });
        $carousel.on('dragEnd', function () {
            $(this).find('.flickity-viewport').removeClass('is-dragging');
        });
    }

    // carousel
    $('.nk-carousel > .nk-carousel-inner').each(function () {
        $(this).flickity({
            pageDots: $(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            imagesLoaded: true,
            cellAlign: $(this).parent().attr('data-cell-align') || 'center'
        });
        if($(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows($(this));
        }
        noClickEventOnDrag($(this));
    });
}

export { initPluginFlickity };
