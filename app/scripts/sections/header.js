var header = function() {

  var init = function() {
    initHeader();
  };

  initHeader = function() {
    var headerContainer = body.find('.MenuBar').first();
    headerContainer.addClass('ft-header-container');
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  header.init();
};
