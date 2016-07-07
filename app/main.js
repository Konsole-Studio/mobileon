module.exports = function(callback, data, mappingUrl, contentType) {

  /* Global DOM variables */
  html = $('html');
  body = $('body');
  head = $('head');

  /* Remove or keep script files */
  require('./scripts/keep_js.js');

  /* Import core/custom functions */
  require('./scripts/core_functions.js');
  require('./scripts/custom_functions.js');

  /* Core functions execution */
  removeAllStyles();
  removeJS();
  removeHtmlComments();
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
  require('./scripts/mapping.js')(mappingUrl, contentType);

  /* Output final content */
  finalHtml = $('html').toString();
  callback(null, finalHtml);
};
