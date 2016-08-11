var home = function() {

  var init = function() {
    initHome();
    initFacebookLike();
    initPromocoes();
    initMaisAcessados();
    initDestaqueCarousel();
    initBlog();
    initNewsletter();
    initGlobalRemover();
  };

  initHome = function() {
    body.addClass('mo-home');
    homeContainer = body.find('#meio');
    homeContainer.addClass("mo-home-container")
  };

  initFacebookLike = function() {
    var facebookLink = homeContainer.find('a[href*="facebook.com/casada.construcao"]');
    var facebookContainer = facebookLink.parent();
    var facebookLikeAPI = '<div class="fb-like" data-href="https://www.facebook.com/casada.construcao.7" data-width="300px" data-layout="standard" data-action="like" data-show-faces="true" data-share="false"></div>'

    facebookLink.remove();

    facebookContainer.addClass('mo-facebookLike-container')
    facebookContainer.append(facebookLikeAPI);
  };

  initPromocoes = function() {
    var promoContainer = homeContainer.find('#capa-promocoes');
    var productContainer = promoContainer.find('a');
    var productImage = promoContainer.find('.cp-prod-foto');
    var promoHeader = '<div class="mo-home-header">Promoções</div>';
    var detailsWrapper = '<div class="mo-product-details-wrapper"/>';

    promoContainer.find('.mbc').remove();
    promoContainer.addClass('mo-promo-container');
    promoContainer.prepend(promoHeader);

    productContainer.addClass('mo-product-container clearfix');

    productImage.addClass('mo-product-image');
    productImage.after(detailsWrapper);

    detailsWrapper = promoContainer.find('.mo-product-details-wrapper');

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

  initMaisAcessados = function() {
    var acessadosContainer = homeContainer.find('#mais_acessados');
    var productContainer = acessadosContainer.find('a');
    var productImage = acessadosContainer.find('.ma-prod-foto');
    var promoHeader = '<div class="mo-home-header">Mais Acessados</div>';
    var detailsWrapper = '<div class="mo-product-details-wrapper"/>';

    acessadosContainer.prev('.mbc').remove();

    acessadosContainer.addClass('mo-acessados-container');
    acessadosContainer.prepend(promoHeader);

    productContainer.addClass('mo-product-container clearfix');

    productImage.addClass('mo-product-image');
    productImage.after(detailsWrapper);

    detailsWrapper = acessadosContainer.find('.mo-product-details-wrapper');

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

  initDestaqueCarousel = function() {
    var carouselContainer = homeContainer.find('#capa-destaque');
    // var carouselScroll = carouselContainer.find('ul');
    // var carouselItem = carouselScroll.find('li');
    // var carouselImage = carouselItem.find('img');
    //
    // carouselImage.map(function(i, el) {
    //   var currentImage = $(this);
    //   var currentSrc = currentImage.attr('src');
    //   var currentParent = currentImage.parents('li');
    //   console.log(currentParent);
    //   currentParent.css('background', 'url('+ currentSrc +')');
    //   currentImage.remove();
    // });
    //
    // carouselItem.find('a').remove();
    //
    // carouselContainer.addClass('mo-destaque-carousel-container');
    // carouselContainer.attr('data-ur-set', 'carousel');
    // carouselContainer.attr('data-ur-fill', '1');
    // carouselContainer.attr('data-ur-infinite', 'enabled');
    // carouselContainer.attr('data-ur-autoscroll', 'enabled');
    //
    // carouselScroll.addClass('mo-destaque-carousel-scroll');
    // carouselScroll.attr('data-ur-carousel-component', 'scroll_container');
    //
    // carouselItem.addClass('mo-destaque-carousel-item');
    // carouselItem.attr('data-ur-carousel-component', 'item');

    /* Hide carousel to simplify information on homepage */
    carouselContainer.addClass('mo-hide');
  };

  initBlog = function() {
    var blogContainer = homeContainer.find('#capa-blog-posts');
    var postContainer = blogContainer.find('.cb-post');
    var postTitle = postContainer.find('.cb-p-tit');
    var postPreview = postContainer.find('.cb-p-descr');
    var postButton = postContainer.find('.cb-p-lm');
    var blogHeader = '<div class="mo-home-header">Blog Casa da Construção</div>';

    body.find('#capa-blog').remove();

    blogContainer.prepend(blogHeader);

    blogContainer.addClass('mo-blog-container');
    postContainer.addClass('mo-post-container')
    postTitle.addClass('mo-post-title');
    postPreview.addClass('mo-post-preview');
    postButton.addClass('mo-post-button');
  };

  initNewsletter = function() {
    var newsletterContainer = homeContainer.find('#capa-cadastro');
    var newsletterInput = newsletterContainer.find('#cademail');
    var newsletterButton = newsletterContainer.find('a');
    var newsletterHeader = '<div class="mo-home-header">Receba as novidades da Casa</div>';
    var newsletterWrapper = '<div class="mo-newsletter-wrapper"/>';

    newsletterContainer.addClass('mo-newsletter-container');
    newsletterInput.addClass('mo-newsletter-input');
    newsletterButton.addClass('mo-newsletter-button fa fa-paper-plane');

    newsletterButton.removeAttr('href');

    newsletterInput.attr('placeholder', 'Email');

    newsletterContainer.prepend(newsletterWrapper);

    newsletterWrapper = newsletterContainer.find('.mo-newsletter-wrapper');

    var newsletterElements = newsletterWrapper.nextAll();

    newsletterElements.map(function(i, el) {
      var currentElement = $(this);
      newsletterWrapper.append(currentElement);
    });

    newsletterContainer.prepend(newsletterHeader);
  };

  initGlobalRemover = function() {
    var capaGrupo = homeContainer.find('#capa-grupo');
    var imageLinksContainer = homeContainer.find('#col-dir');

    capaGrupo.remove();
    imageLinksContainer.remove();
  }

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  home.init();
};
