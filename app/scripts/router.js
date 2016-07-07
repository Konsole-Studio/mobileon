module.exports = function(pageTypes, mappingUrl, mode) {
  if ( mode == 'mapping' ) {
    for ( var i = 0; i < pageTypes.length; i++ ) {
      var url = pageTypes[i].url;
      if ( mappingUrl.match(url) ) {
        // import all files associated with this pageInfo mapping
        var filepath = pageTypes[i].appFile[0];
        console.log('[Router] -->  Importing page file: ' + filepath + '.');
        require(filepath)();
      } else {
        /* No mapping found */
      }
    }
  } else {
    for ( var i = 0; i < pageTypes.length; i++ ) {
      var url = pageTypes[i].url;
      if ( mappingUrl.match(url) ) {
        console.log('[Router] --> Perfect proxy for ' + mappingUrl);
        return true;
      } else {
        /* No mapping found */
      }
    }
  }
};
