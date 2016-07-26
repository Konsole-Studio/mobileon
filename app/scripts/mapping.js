module.exports = function(mappingUrl) {
  pageTypes = [];

 /* Map URLs here */
  pageTypes.push(
    {
      type: "home",
      url: /(index|^\/$|^\/\?)/gi,
      appFile: ["./pages/home/home.js"]
    },
    {
      type: "pdp",
      url: /produto\-/gi,
      appFile: ["./pages/browse/pdp.js"]
    },
    {
      type: "404",
      url: /menu/g,
      appFile: ["./pages/browse/menu.js"]
    }
  );

  /* Router will import a file according to mapping */
  require('./router')(pageTypes, mappingUrl, 'mapping');
};
