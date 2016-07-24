/* All functions here will be available on index.js */

/* Fix src for images on pampa burger */
fixPampaImgSrc = function() {
  html.find('img.temp_no_img_src').each(function(i, elem) {
    var fixedSrc = $(this).attr('data-orig-src');
    $(this).removeClass('temp_no_img_src');
    $(this).attr('src', fixedSrc);
  });
}

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

module.exports = {
  fixPampaImgSrc: fixPampaImgSrc,
  includeFacebookAPI: includeFacebookAPI
};
