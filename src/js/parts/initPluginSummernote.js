import { $ } from "./_utility";

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/
function initPluginSummernote () {
    if(typeof $.fn.summernote === 'undefined') {
        return;
    }

    $('.nk-summernote').summernote({
        height: 300,
        dialogsInBody: true,
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['insert', ['link', 'picture', 'video']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['misc', ['codeview']]
        ]
    });

    // fix after load popovers are visible
    $('.note-popover').hide();
}

export { initPluginSummernote };
