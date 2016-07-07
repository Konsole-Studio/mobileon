var home = function() {

  var init = function() {
    initHome();
  };

  initHome = function() {
    body.addClass('ft-home');
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  home.init();
};
