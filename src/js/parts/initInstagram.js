import { $ } from "./_utility";

/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/
function initInstagram () {
    const self = this;
    let $instagram = $('.nk-instagram');
    if(!$instagram.length || !self.options.templates.instagram) {
        return;
    }

    /**
     * Templating a instagram item using '{{ }}' braces
     * @param  {Object} data Instagram item details are passed
     * @return {String} Templated string
     */
    function templating (data, temp) {
        let temp_variables = ['link', 'image', 'caption'];

        for (let i = 0, len = temp_variables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + temp_variables[i] + '}}', 'gi'), data[temp_variables[i]]);
        }

        return temp;
    }

    $instagram.each(function () {
        let $this = $(this);
        let options = {
            userID: $this.attr('data-instagram-user-id') || null,
            count: $this.attr('data-instagram-count') || 6,
            template: $this.attr('data-instagram-template') || self.options.templates.instagram,
            quality: $this.attr('data-instagram-quality') || 'sm', // sm, md, lg
            loadingText: self.options.templates.instagramLoadingText,
            failText: self.options.templates.instagramFailText,
            apiPath: self.options.templates.instagramApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html('<div class="col-xs-12">' + options.failText + '</div>');
            console.error('You should run you website on webserver with PHP to get working Instagram');
            return;
        }

        $this.html('<div class="col-xs-12">' + options.loadingText + '</div>');

        // Fetch instagram images
        $.getJSON(options.apiPath, {
            userID: options.userID,
            count: options.count
        }, (response) => {
            $this.html('');

            for (let i = 0; i < options.count; i++) {
                let instaItem = false;
                if(response[i]) {
                    instaItem = response[i];
                } else if(response.statuses && response.statuses[i]) {
                    instaItem = response.statuses[i];
                } else {
                    break;
                }

                let resolution = 'thumbnail';
                if(options.quality === 'md') {
                    resolution = 'low_resolution';
                }
                if(options.quality === 'lg') {
                    resolution = 'standard_resolution';
                }

                let temp_data = {
                    link: instaItem.link,
                    image: instaItem.images[resolution].url,
                    caption: instaItem.caption
                };

                $this.append(templating(temp_data, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail((a) => {
            $this.html('<div class="col-xs-12">' + options.failText + '</div>');
            $.error(a.responseText);
        });

    });
}

export { initInstagram };
