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
  return link.replace(/((?:(?:(?:http(?:s?)):)?(?:\/\/)?(?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]*)(?:\.[\.a-zA-Z0-9\-]*)|localhost))(?:\:[0-9]+)?)/, function(originalUrl) {
      var rewritten = rewriterCore(originalUrl);
      return rewritten;
  });
}

rewriterCore = function (originalUrl) {

  var isHttp, isHttps = false
  var httpRegex = new RegExp('http://', 'gi');
  var httpsRegex = new RegExp('http://', 'gi');

  originalUrl.match(httpRegex) ? isHttp = true : null;
  originalUrl.match(httpsRegex) ? isHttps = true : null;

  originalUrl = originalUrl.replace(/www\./, '')
                 .replace(httpRegex, '')
                 .replace(httpsRegex, '')
                 .replace(/\./g, '-');

  console.log(originalUrl);


  originalUrl = isHttps ? 'https://appft-' + originalUrl : 'https://appft-' + originalUrl;
  return originalUrl;
}

// slashPath = function() {
//   console.log("ESTAMOS AQUI");
//   console.log('hostPath is ' + hostPath);
//   return hostPath.replace(/[^\/]+$/, '').replace(/^$/, '/');
// }
//
// absolutize = function(href) {
//   href = href.trim();
//   if (/^(?![a-zA-Z]+:)(?!\/\/)(?!$)/.test(href)) {
//       return '//' + hostPath + (href[0] === '/' ? '' : slashPath()) + href;
//   }
//   return href;
// }
//
// absolutizeSrcs = function() {
//   html.find('img, script').attr('src', function(i, attr) {
//       return attr ? absolutize(attr) : null;
//   });
// }

// rewriteToProxy = function(hostHH, secure, catchAll) {
//   var parsedHost, sanitizedHost, prefix, missing ="", ctxRules, result;
//   // fixup links that have been passed in with no protocol, or begin with forward slashes
//   // parsing a bad url before doing this will lead to a Url object with unset keys
//   prefix = hostHH.match(/^(?:https?:)?\/\//);
//   if (!prefix) {
//     missing = secure ? 'https://' : 'http://';
//   }
//   else if (prefix[0] === '//') {
//     missing = secure ? 'https:' : 'http:';
//   }
//   sanitizedHost = missing + hostHH;
//   // parse the sanitized host into a url object
//   parsedHost = url.parse(sanitizedHost);
//   if (parsedHost.port !== null && !(parsedHost.port === '443' || parsedHost.port === '80')) {
//     // skip rewriting links using nonstandard ports
//     return hostHH;
//   }
//   // Prevent adding the trailing slash when formatting
//   parsedHost.pathname = "";
//   // load the rules or interpolate them if they are missing from the context
//   ctxRules = rules || [
//     { Proxy: 'http://' + env.host,
//         Upstream: 'http://' + env.source_host
//     },
//     { Proxy: 'https://' + env.host,
//         Upstream: 'https://' + env.source_host
//     },
//     { Proxy: 'http://' + env.host,
//         Upstream: 'http://' + env.source_host.replace(/^www\./, '')
//     },
//     { Proxy: 'https://' + env.host,
//         Upstream: 'https://' + env.source_host.replace(/^www\./, '')
//     }
//   ];
//   if (ctxRules[0]) {
//     for (var i = 0; i < ctxRules.length; i++) {
//       var rr = ctxRules[i];
//       var match = sanitizedHost.match(rr.Upstream);
//       if (rr.Direction !== 1 && match!==null && match.index===0) {
//           // We found a match
//           var proxy = url.parse(rr.Proxy);
//           // Prevent adding the trailing slash when formatting
//           proxy.pathname = "";
//           if (env.__catch_all_enabled__ === 'true') {
//               if (!proxy.host.match(catchAll)) {
//                   // The host should have the catchall appended, but doesn't yet
//                   proxy.hostname = proxy.hostname + catchAll;
//                   //unsetting host will reformat the url for us
//                   proxy.host = undefined;
//               }
//           }
//           result = url.format(proxy);
//           if (result.substring(0, missing.length) === missing) {
//               result = result.substring(missing.length);
//           }
//           return result;
//       }
//     }
//   }
//   return hostHH;
// }



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
