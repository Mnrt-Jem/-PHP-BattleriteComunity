import { $, tween } from "./_utility";

/*------------------------------------------------------------------

  Init Counters

-------------------------------------------------------------------*/
function initCounters () {
    const self = this;
    let $progressCount = $('.nk-progress.nk-count');
    let $numberCount = $('.nk-count:not(.nk-progress)');

    // set default progress
    $progressCount.each(function () {
        $(this).attr('data-nk-count', $(this).attr('data-progress'))
            .find('.nk-progress-line > div').css('width', ($(this).attr('data-nk-count-from') || '0') + '%')
            .find('.nk-progress-percent').html('');
    });

    // set default numbers
    $numberCount.each(function () {
        $(this).attr('data-nk-count', $(this).attr('data-nk-count') || parseInt($(this).text(), 10))
            .html($(this).attr('data-nk-count-from') || '0');
    });

    let countersNum = 1;
    function runCounters () {
        if(!countersNum) {
            return;
        }

        let progress = $progressCount.filter('[data-nk-count]');
        let numbers = $numberCount.filter('[data-nk-count]');
        countersNum = progress.length + numbers.length;

        // progress
        $progressCount.filter('[data-nk-count]').each(function () {
            let $item = $(this);
            if(self.isInViewport($item)) {
                let count = {
                    curr: $item.attr('data-nk-count-from') || '0',
                    to: $item.attr('data-nk-count')
                };
                let $itemLine = $item.find('.nk-progress-line > div');
                let $itemLabel = $item.find('.nk-progress-percent');

                tween.to($itemLine, 1, {
                    width: count.to + '%'
                });
                tween.to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate () {
                        $itemLabel.text(count.curr + '%');
                    }
                });
                $item.removeAttr('data-nk-count');
            }
        });

        // number
        $numberCount.filter('[data-nk-count]').each(function () {
            let $item = $(this);
            if(self.isInViewport($item)) {
                let count = {
                    curr: $item.text(),
                    to: $item.attr('data-nk-count')
                };
                $item.removeAttr('data-nk-count data-nk-count-from');
                tween.to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate () {
                        $item.text(count.curr);
                    }
                });
            }
        });
    }

    self.throttleScroll(runCounters);
    runCounters();
}

export { initCounters };
