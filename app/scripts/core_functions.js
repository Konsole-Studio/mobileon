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
  head.append('<script src="http://' + hostPath + '/vendor/jquery-2.1.3.js"></script>');
  head.append('<script src="http://' + hostPath + '/vendor/jquery.DOMNodeAppear.js"></script>');
}

insertMainStyle = function() {
  head.append('<link rel="stylesheet" href="http://' + hostPath + '/styles/style.css">');
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
  return link.replace(/((?:(?:(?:http(?:s?)):)?(?:\/\/)?(?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]*)(?:\.[\.a-zA-Z0-9\-]*)|localhost))(?:\:[0-9]+)?)/, function(originalUrl) {
      var rewritten = rewriterCore(originalUrl);
      return rewritten;
  });
}

rewriterCore = function (originalUrl) {
  var untouchedUrl = originalUrl
  var isHttp, isHttps = false
  var httpRegex = new RegExp('http://', 'gi');
  var httpsRegex = new RegExp('http://', 'gi');
  var hostOriginRegex = new RegExp('^' + hostOrigin, 'gi');

  originalUrl.match(httpRegex) ? isHttp = true : null;
  originalUrl.match(httpsRegex) ? isHttps = true : null;

  originalUrl = originalUrl.replace(/www\./, '')
                 .replace(httpRegex, '')
                 .replace(httpsRegex, '');

  console.log("HOST PATH: " + hostPath);
  console.log("PROXIED DOMAIN: " + hostOrigin);
  console.log("HOST VAR: " + hostVar);
  console.log("ORIGINAL LINK: " + originalUrl);

  if ( originalUrl.match(hostOriginRegex) ) {
    originalUrl = isHttps ? 'http://' + hostPath : 'http://' + hostPath;
    console.log("FINAL LINK: " + originalUrl);
    return originalUrl;
  } else {
    console.log("UNTOUCHED LINK: " + untouchedUrl);
    return untouchedUrl;
  }


}


removeHtmlComments = function() {
  function isComment(index, node) {
    return node.type === 'comment'
  }
  $.root().contents().filter(isComment).remove();
  head.contents().filter(isComment).remove();
  body.contents().filter(isComment).remove();
}

fixPampaImgSrc = function() {
  html.find('img.temp_no_img_src').each(function(i, elem) {
    var fixedSrc = $(this).attr('data-orig-src');
    $(this).removeClass('temp_no_img_src');
    $(this).attr('src', fixedSrc);
  });
}

module.exports = {
  removeAllStyles: removeAllStyles,
  removeJS: removeJS,
  insertVendorScripts: insertVendorScripts,
  fixPampaImgSrc: fixPampaImgSrc,
  insertMainStyle: insertMainStyle,
  removeHtmlComments: removeHtmlComments,
  rewriteLinks: rewriteLinks
  //absolutizeSrcs: absolutizeSrcs
};
