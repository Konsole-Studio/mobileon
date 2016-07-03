module.exports = function(callback, data, mappingUrl, contentType) {
  /* For now, just mapping html files */
  if( contentType && contentType.match(/html/g) ) {
    /* Global DOM variables */
    html = $('html');
    body = $('body');
    head = $('head');

    require('./keep_js.js')();
    require('./core_functions.js');

    removeAllStyles();
    removeJS();
    insertVendorScripts();
    fixPampaImgSrc();

    require('./mapping.js')(mappingUrl, contentType);

    finalHtml = $('html').toString();
    // Output final content
    callback(null, finalHtml);
  } else {
    callback(null, data);
  }

};
