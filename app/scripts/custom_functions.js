/* All functions here will be available on index.js */

includeFacebookAPI = function() {
  var facebookAPI = '<div id="fb-root"></div>' +
                    '<script>(function(d, s, id) {' +
                    'var js, fjs = d.getElementsByTagName(s)[0];' +
                    'if (d.getElementById(id)) return;' +
                    'js = d.createElement(s); js.id = id;' +
                    'js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7";' +
                    'fjs.parentNode.insertBefore(js, fjs);' +
                    '}(document, "script", "facebook-jssdk"));</script>';
  body.prepend(facebookAPI);
}

hideCarouselIfNotHome = function() {
  if( !body.hasClass('mo-home') ) {
    var carouselContainer = body.find('.mo-header-carousel-container');
    carouselContainer.addClass('mo-hide');
  }
}

module.exports = {
  includeFacebookAPI: includeFacebookAPI,
  hideCarouselIfNotHome: hideCarouselIfNotHome
};
