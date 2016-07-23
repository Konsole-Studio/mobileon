jQuery(document).ready(function() {
  /* Variable declarations */
  var menuButton = jQuery('.ft-menu-button');
  var siteMask = jQuery('.ft-site-mask');

  /* Event declarations */
  menuButton.on('click', function() {
    handleMenu();
  });

  siteMask.on('click', function() {
    handleMenu();
  });

  /* Function declarations */
  function handleMenu() {
    var siteContainer = jQuery('.ft-site-wrap');
    var siteMask = jQuery('.ft-site-mask');
    var menuContainer = jQuery('.ft-menu-container ');
    if( !siteContainer.hasClass('ft-nav-opened') ) {
      siteContainer.addClass('ft-nav-opened');
      siteMask.addClass('active');
      menuContainer.addClass('active');
    } else {
      siteContainer.removeClass('ft-nav-opened');
      siteMask.removeClass('active');
      setTimeout(function() {
        menuContainer.removeClass('active');
      }, 200);

    }
  }
});
