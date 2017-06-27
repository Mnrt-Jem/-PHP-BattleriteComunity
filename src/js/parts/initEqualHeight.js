import { $ } from "./_utility";

/*------------------------------------------------------------------

  Init Equal Height

-------------------------------------------------------------------*/
function initEqualHeight () {
    const self = this;

    function calculate () {
        $('.equal-height:visible').each(function () {
            let currentTallest = 0;
            let currentRowStart = 0;
            let rowDivs = [];
            let topPosition = 0;
            let currentDiv = 0;
            let $el;
            $(this).children('*').each(function () {
                $el = $(this);
                $el.css('height', '');
                topPosition = $el.position().top;

                if (currentRowStart !== topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].css('height', currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = $el.innerHeight();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].css('height', currentTallest);
                }
            });
        });
    }

    calculate();
    self.debounceResize(calculate);
}

export { initEqualHeight };
