module.exports = function(callback, data, mappingUrl, contentType) {

  /* Global DOM variables */
  html = $('html');
  body = $('body');
  head = $('head');

  /* Remove or keep script files */
  require('./keep_js.js');

  /* Import core/custom functions */
  require('./core_functions.js');
  require('./custom_functions.js');

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

  /* Import mappings */
  require('./mapping.js')(mappingUrl, contentType);

  /* Output final content */
  finalHtml = $('html').toString();
  callback(null, finalHtml);
};
