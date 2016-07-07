var error404 = function() {

  var init = function() {
    initError404();
  };

  initError404 = function() {
    body.addClass('ft-404');
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  error404.init();
};
