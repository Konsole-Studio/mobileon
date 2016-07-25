var home = function() {

  var init = function() {
    initHome();
    initFacebookLike();
    initPromocoes();
  };

  initHome = function() {
    body.addClass('mc-home');
    homeContainer = body.find('#meio');
    homeContainer.addClass("mc-home-container")
  };

  initFacebookLike = function() {
    var facebookLink = homeContainer.find('a[href*="facebook.com/casada.construcao"]');
    var facebookContainer = facebookLink.parent();
    var facebookLikeAPI = '<div class="fb-like" data-href="https://www.facebook.com/casada.construcao.7" data-width="300px" data-layout="standard" data-action="like" data-show-faces="true" data-share="false"></div>'

    facebookLink.remove();

    facebookContainer.addClass('mc-facebookLike-container')
    facebookContainer.append(facebookLikeAPI);
  };

  initPromocoes = function() {
    var promoContainer = homeContainer.find('#capa-promocoes');
    var productContainer = promoContainer.find('a');
    var productImage = promoContainer.find('.cp-prod-foto');
    var promoHeader = '<div class="mc-home-header">Promoções</div>';
    var detailsWrapper = '<div class="mc-product-details-wrapper"/>';

    promoContainer.find('.mbc').remove();
    promoContainer.addClass('mc-promo-container');
    promoContainer.prepend(promoHeader);

    productContainer.addClass('mc-product-container');

    productImage.addClass('mc-product-image');
    productImage.after(detailsWrapper);

    detailsWrapper = promoContainer.find('.mc-product-details-wrapper');

    /* Move details into each wrapper */
    detailsWrapper.map(function(i, el) {
      var currentWrapper = $(this);
      var detailElements = currentWrapper.nextAll();
      detailElements.map(function(i, el) {
        var currentDetail = $(this);
        currentWrapper.append(currentDetail);
      });
    });

  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  home.init();
};
