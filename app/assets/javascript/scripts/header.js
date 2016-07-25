jQuery(document).ready(function() {
  /* Variable declarations */
  var menuButton = jQuery('.mc-menu-button');
  var siteMask = jQuery('.mc-site-mask');
  var carouselContainer = jQuery('.mc-header-carousel-scroll');

  /* Event declarations */
  menuButton.on('click', function() {
    handleMenu();
  });

  siteMask.on('click', function() {
    handleMenu();
  });

  carouselContainer.DOMNodeAppear(function() {
    carouselContainer.css('transform', 'translate3d(0px, 0px, 0px)');
  });

  /* Function declarations */
  function handleMenu() {
    var siteContainer = jQuery('.mc-site-wrap');
    var siteMask = jQuery('.mc-site-mask');
    var menuContainer = jQuery('.mc-menu-container ');
    if( !siteContainer.hasClass('mc-nav-opened') ) {
      siteContainer.addClass('mc-nav-opened');
      siteMask.addClass('active');
      menuContainer.addClass('active');
    } else {
      siteContainer.removeClass('mc-nav-opened');
      siteMask.removeClass('active');
      setTimeout(function() {
        menuContainer.removeClass('active');
      }, 200);

    }
  }
});
