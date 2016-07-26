var pdp = function() {

  var init = function() {
    initProductPage();
  };

  initProductPage = function() {
    body.addClass('mc-pdp');
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  pdp.init();
};
