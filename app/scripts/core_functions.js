removeAllStyles = function() {
  html.find('link[rel="stylesheet"], style').remove();
}

removeJS = function() {
  html.find("script").each(function(i, elem) {
    if (!($(this).attr("data-keep") || $(this).attr("data-keep") === 'false')) {
      $(this).remove();
    }
  });
}

insertVendorScripts = function() {
  /* TODO: Optimize this, read all files from /vendor folder */
  head.append('<script src="http://' + host + '/vendor/jquery-2.1.3.js"></script>');
  head.append('<script src="http://' + host + '/vendor/jquery.DOMNodeAppear.js"></script>');
}

insertMainStyle = function() {
  head.append('<link rel="stylesheet" href="http://' + host + '/styles/style.css">');
}

fixPampaImgSrc = function() {
  html.find('img.temp_no_img_src').each(function(i, elem) {
    var fixedSrc = $(this).attr('data-orig-src');
    $(this).removeClass('temp_no_img_src');
    $(this).attr('src', fixedSrc);
  });
}

removeHtmlComments = function() {
  function isComment(index, node) {
    return node.type === 'comment'
  }
  $.root().contents().filter(isComment).remove();
  head.contents().filter(isComment).remove();
  body.contents().filter(isComment).remove();
}

module.exports = {
  removeAllStyles: removeAllStyles,
  removeJS: removeJS,
  insertVendorScripts: insertVendorScripts,
  fixPampaImgSrc: fixPampaImgSrc,
  insertMainStyle: insertMainStyle,
  removeHtmlComments: removeHtmlComments
};
