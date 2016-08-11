var footer = function() {

  var init = function() {
    initFooter();
  };

  initFooter = function() {
    footerContainer = body.find('#footer');
    var footerContent = footerContainer.find('#footer-menu');

    footerContainer.addClass('mo-footer');
    footerContent.addClass('mo-footer-content');

    var desktopHost = footerContent.find('div');
    desktopHost.remove();
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  footer.init();
};
