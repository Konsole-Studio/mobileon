var menu = function() {

  var init = function() {
    initMenu();
  };

  initMenu = function() {
    body.addClass('mc-menu');
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  menu.init();
};
