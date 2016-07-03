(function ($) {
  $.fn.DOMNodeAppear = function (callback) {
    var $this = $(this),
      options = {
        keyframes: '@keyframes nodeInserted {from {clip: rect(1px, auto, auto, auto); } to {clip: rect(0px, auto, auto, auto); } } @-moz-keyframes nodeInserted {from {clip: rect(1px, auto, auto, auto); } to {clip: rect(0px, auto, auto, auto); } } @-webkit-keyframes nodeInserted {from {clip: rect(1px, auto, auto, auto); } to {clip: rect(0px, auto, auto, auto); } } @-ms-keyframes nodeInserted {from {clip: rect(1px, auto, auto, auto); } to {clip: rect(0px, auto, auto, auto); } } @-o-keyframes nodeInserted {from {clip: rect(1px, auto, auto, auto); } to {clip: rect(0px, auto, auto, auto); } }, ',
        selector: $this.selector,
        stylesClass: $this.selector.replace('.', ''),
        styles: $this.selector + ' { -moz-animation-name: nodeInserted; -webkit-animation-name: nodeInserted; animation-name: nodeInserted; -moz-animation-duration: 0.001s; -webkit-animation-duration: 0.001s; animation-duration: 0.001s; }'
      };

    // if the keyframes aren't present, add them in a style element
    if (!$('style.domnodeappear-keyframes').length) {
      $('head').append('<style class="domnodeappear-keyframes">' + options.keyframes + '</style>');
    }

    // add animation to selected element
    $('head').append('<style class="' + options.stylesClass + '-animation">' + options.styles + '</style>');

    // on animation start, execute the callback
    $(document).on('animationstart webkitAnimationStart oanimationstart MSAnimationStart', function (e) {
      var self = $(e.target);
      if (e.originalEvent.animationName === 'nodeInserted' && self.is(options.selector)) {
        if (typeof callback === 'function') {
          callback.call(self);
        }
      }
    });
  };

  jQuery.fn.onAppear = jQuery.fn.DOMNodeAppear;
})(jQuery);