module.exports = function(pageTypes, mappingUrl) {
  for ( var i = 0; i < pageTypes.length; i++ ) {
    var url = pageTypes[i].url;
    if ( mappingUrl.match(url) ) {
      // import all files associated with this pageInfo mapping
      var filepath = pageTypes[i].appFile[0];
      console.log("--> Requiring file at " + filepath + ".");
      require(filepath)();
    } else {
      /* No mapping found */
    }
  }
};
