module.exports = function(mappingUrl) {
  pageTypes = [];

 /* Perfect proxy URLs here */
  pageTypes.push(
    {
      type: "lojas",
      url: /lojas/g
    }
  );

  /* Router will catch perfect proxied pages */
  var isPerfectProxy = require('./router')(pageTypes, mappingUrl, 'perfect_proxy');
  return isPerfectProxy;
};
