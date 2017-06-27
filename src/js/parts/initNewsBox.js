import { $, $doc } from "./_utility";

/*------------------------------------------------------------------

 Init News Box

 -------------------------------------------------------------------*/
function initNewsBox () {
    $doc.on('click', '.nk-news-box .nk-news-box-item', function () {
        let $this = $(this);
        let $info = $this.parents('.nk-news-box:eq(0)').find('.nk-news-box-each-info');

        // get data
        let data = {
            title: $this.find('.nk-news-box-item-title').html(),
            img: $this.find('.nk-news-box-item-full-img').attr('src'),
            categories: $this.find('.nk-news-box-item-categories').html(),
            text: $this.find('.nk-news-box-item-text').html(),
            url: $this.find('.nk-news-box-item-url').attr('href'),
            date: $this.find('.nk-news-box-item-date').html()
        };

        // set data
        $info.find('.nk-news-box-item-title').html(data.title);
        $info.find('.nk-news-box-item-image').css('background-image', 'url("' + data.img + '")');
        $info.find('.nk-news-box-item-categories').html(data.categories);
        $info.find('.nk-news-box-item-text').html(data.text);
        $info.find('.nk-news-box-item-more').attr('href', data.url);
        $info.find('.nk-news-box-item-date').html(data.date);

        // activate item
        $this.addClass('nk-news-box-item-active')
            .siblings().removeClass('nk-news-box-item-active');
    });

    // click on active item on load
    $('.nk-news-box .nk-news-box-item-active').trigger('click');
}

export { initNewsBox };
