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

rewriteLinks = function() {
  html.find('a, head base[href]').attr('href', function(_, attr) {
      return attr ? rewriteLink(attr) : null;
  });
  html.find('form').attr('action', function(_, attr) {
      return attr ? rewriteLink(attr) : null;
  });
}

rewriteLink = function(link) {
  link = link.trim();
  if (/^mailto:/.test(link)) {
      return link;
  }
  return link.replace(/((?:(?:(?:http(?:s?)):)?(?:\/\/)?(?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]*)(?:\.[\.a-zA-Z0-9\-]*)|localhost))(?:\:[0-9]+)?)/gi, function(hostHH) {
      var rewritten = rewriterCore(hostHH);
      return rewritten;
  });
}

rewriterCore = function (hostHH) {
  // TODO: KEEP http or https protocol, fix links opening after /
  hostHH = hostHH.replace(/www\./, '')
                 .replace(/https:\/\//, '')
                 .replace(/http:\/\//, '');
  hostHH = '//mlocal.' + hostHH;
  console.log(hostHH);
  return hostHH;
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
  removeHtmlComments: removeHtmlComments,
  rewriteLinks: rewriteLinks
};
