var header = function() {

  var init = function() {
    initHeader();
    initSearch();
    initMenu();
    initCarousel();
  };

  initHeader = function() {
    headerContainer = body.find('#top').first();
    var headerLogo = headerContainer.find('#top-content-logo');

    headerContainer.addClass('mo-header-container');
    headerLogo.before('<div class="mo-menu-button fa fa-bars fa-2x"/>');
  };

  initSearch = function() {
    var searchContainer = body.find('#fmbusca');
    var searchInput = searchContainer.find('#fm-q');
    var searchButton = searchContainer.find('#btn-buscar');

    searchContainer.addClass('mo-search-container');

    searchInput.addClass('mo-search-input');
    searchInput.attr('placeholder', 'Procurando algo?');

    searchButton.addClass('mo-search-button fa fa-search');
    searchButton.removeAttr('href');
  };

  initMenu = function() {
    var menuContent = body.find('#menu-content');
    var menuMapLinksContainer = menuContent.find('#Map');
    var menuMapLinks = menuContent.find('area');

    menuMapLinksContainer.prepend('<ul class="mo-menu-container"/>');
    var menuContainer = menuMapLinksContainer.find('.mo-menu-container');

    /* Turn area into <a> elements */
    menuMapLinks.map(function(i, el) {
      var currentMap = $(this);
      var altText = currentMap.attr('alt');
      var href = currentMap.attr('href');
      var linkContainer = $('<li class="mo-menu-item"/>');

      currentMap.before(linkContainer);

      var currentLinkContainer = currentMap.prev('li');
      currentLinkContainer.append(currentMap);

      /* Move current link */
      menuContainer.append(currentLinkContainer);

      currentMap.replaceWith('<a href="'+ href +'">' + altText +'</a>');
    });

    menuContent.prepend(menuContainer);
    menuContent.children('img').addClass('mo-hide');

    body.prepend('<div class="mo-site-wrap"/>');
    var siteContainer = body.find('.mo-site-wrap');
    var siteElements = siteContainer.nextAll();

    siteElements.map(function(i, el) {
      var currentElement = $(this);
      siteContainer.append(currentElement);
    });

    siteContainer.prepend('<div class="mo-site-mask"/>')

    body.prepend(menuContainer);
  };

  initCarousel = function() {
    var carouselContainer = body.find('.ws_images');
    var carouselScroll = carouselContainer.find('ul');
    var carouselItem = carouselScroll.find('li');
    var carouselImage = carouselItem.find('img');
    var wowSliderText = body.find('.ws_script');

    wowSliderText.remove();

    carouselImage.map(function(i, el) {
      var currentImage = $(this);
      var currentSrc = currentImage.attr('src');
      var currentParent = currentImage.parents('li');

      currentParent.css('background', 'url('+ currentSrc +')');
      currentImage.remove();
    });

    carouselItem.find('a').remove();

    carouselContainer.addClass('mo-header-carousel-container');
    carouselContainer.attr('data-ur-set', 'carousel');
    carouselContainer.attr('data-ur-fill', '1');
    carouselContainer.attr('data-ur-infinite', 'enabled');
    carouselContainer.attr('data-ur-autoscroll', 'enabled');

    carouselScroll.addClass('mo-header-carousel-scroll');
    carouselScroll.attr('data-ur-carousel-component', 'scroll_container');

    carouselItem.addClass('mo-header-carousel-item');
    carouselItem.attr('data-ur-carousel-component', 'item');
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  header.init();
};
