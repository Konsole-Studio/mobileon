module.exports = function(callback, data, mappingUrl, contentType, environment) {

  /* Global DOM variables */
  html = $('html');
  body = $('body');
  head = $('head');

  /* Import perfect proxy checker */
  var isPerfectProxy = require('./scripts/perfect_proxy.js')(mappingUrl) || false;

  if ( !isPerfectProxy ) {

    /* Remove or keep script files */
    require('./scripts/keep_js.js');

    /* Import core/custom functions */
    require('./scripts/core_functions.js');
    require('./scripts/custom_functions.js');

    /* Core functions execution */
    removeAllStyles();
    removeJS();
    removeHtmlComments();
    setBodyEnvironment(environment);
    rewriteLinks();
    mobileMetaTag();
    insertVendorScripts();
    insertMainStyle();

    /* Custom functions execution */
    fixPampaImgSrc();

    /* Import common sections */
    require('./scripts/sections/header.js');
    require('./scripts/sections/footer.js');

    /* Import mappings */
    require('./scripts/mapping.js')(mappingUrl);

    /* Output final content */
    finalHtml = $('html').toString();
    callback(null, finalHtml);
  } else {
    /* Perfect proxy page */

    /* Import core/custom functions */
    require('./scripts/core_functions.js');

    rewriteLinks();

    finalHtml = $('html').toString();
    callback(null, finalHtml);
  }
};
