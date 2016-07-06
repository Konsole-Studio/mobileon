var express = require('express');
var app = express();
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
proxy = require('express-http-proxy');
var domain = require('domain');
var d = domain.create();
var sassMiddleware = require('node-sass-middleware');
fs = require('fs');
var path = require('path');
var cleanup = require('./cleanup').Cleanup(cleanupHosts);
cheerio = require('cheerio');
var url_map = require('./url_map.json');

d.on('error', function(err) {
  console.error(err);
});

/* Site Route */
var routes = [];
var routesEndpoint = [];
var routesHost = [];

var originalHosts = '';

hostOrigin = '';
hostPath = '';
environment = 'dev';

getRoutes();
getRoutesEndpoint();
getRoutesHost();

/* Site routes */
function getRoutes() {
  var urlRoutesLength = JSON.stringify(url_map.route.length);
  for( var i = 0; i < urlRoutesLength; i++ ) {
    routes.push(JSON.stringify(url_map.route[i]));
  }
}

function getRoutesEndpoint() {
  //routeEndpoint = routes[0].split('=> ')[1].replace('\"', '');
  for( var i = 0; i < routes.length; i++ ) {
    routesEndpoint.push(routes[i].split('=> ')[1].replace('\"', ''));
  }
}

function getRoutesHost() {
  //routeHost = routes[0].split('=> ')[0].replace('\"', '');
  for( var i = 0; i < routes.length; i++ ) {
    routesHost.push(routes[i].split('=> ')[0].replace('\"', ''));
  }
}

function defineHostVariables(req) {
  host = req.headers.host;
  //console.log('Host: ' + host);
  hostVar = host.split('.')[0];
  //console.log("Hostvar " + hostVar);
}

function updateHostFile() {
  fs.readFile('/etc/hosts', 'utf8', function (err, hostsContent) {
    if (err) {
      return console.log(err);
    }

    originalHosts = hostsContent;

    newHostsContent = hostsContent + '\n# FIRST TOUCH AUTO GENERATED HOSTS';
    //newHostsContent = newHostsContent + '\n' + '127.0.0.1' + '\t' + routeHost;
    for( var i = 0; i < routesHost.length; i++ ) {
      newHostsContent = newHostsContent + '\n' + '127.0.0.1' + '\t' + routesHost[i];
    }

    /* Verify if writeFile is successful to avoid Heroku issues */
    d.run(function() {
      fs.writeFile('/etc/hosts', newHostsContent, function (err) {
        if (err) throw err;
      });
    });
  });
}

function cleanupHosts() {
  console.log('Restoring original /etc/hosts file...');
    fs.writeFileSync('/etc/hosts', originalHosts);
};

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, '/app/assets/stylesheets'),
  dest: __dirname + '/app/assets/stylesheets/css',
  debug: true,
  force: true,
  outputStyle: 'nested',
  prefix:  '/styles'  // Where prefix is at <link rel="stylesheets" href="styles/style.css"/>
}));

app.use("/vendor", express.static(__dirname + '/app/assets/javascript/vendor'));
app.use(express.static(path.join(__dirname, '/app/assets/stylesheets/css')));

/* Request handler */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // intercept OPTIONS method
  if( 'OPTIONS' == req.method ) {
    res.sendStatus(200);
  }

  /* Proxy Router */
  hostOrigin = req.headers['host'];

  /* Verify if Development */
  if ( hostOrigin.match(/mlocal/g) ) { //mlocal.konsole.studio
    environment = 'development';
    hostOrigin = hostOrigin.replace(/\mlocal\./g, ''); //konsole.studio
  }
  /* Verify if Heroku*/
  else if( hostOrigin.match(/herokuapp/g) ) { //appft-konsole-studio.herokuapp.com
    environment = 'heroku';
    hostOrigin = hostOrigin.replace(/\.herokuapp\.com/gi, '') //appft-konsole-studio
                           .replace(/appft\-stage\-/gi, '') //konsole-studio
                           .replace(/appft\-/gi, '')
                           .replace(/\-/gi, '.'); //konsole.studio
  }
  /* Verify if Stage */
  else if ( hostOrigin.match(/mstage\./g) ) { //mstage.konsole.studio
    environment = 'stage';
    hostOrigin = hostOrigin.replace(/\mstage\./g, ''); //konsole.studio
  }
  /* Verify if Production */
  else if ( hostOrigin.match(/(m\.|mobile\.)/g) ) { //m.konsole.studio / mobile.konsole.studio
    environment = 'production';
    hostOrigin = hostOrigin.replace(/(\m\.|mobile\.)/g, ''); //konsole.studio
  }
  /* Verify if Test */
  else if ( hostOrigin.match(/test\./g) ) { //test.konsole.studio
    environment = 'test';
    hostOrigin = hostOrigin.replace(/test\./g, ''); //konsole.studio
  }

  for( var i=0; i < routesEndpoint.length; i++ ) {
    var hostOriginRegExp = new RegExp('^' + hostOrigin, 'gi');
    var currentEndpoint = routesEndpoint[i];
    console.log('CURRENT HOST ORIGIN: ' + hostOrigin);
    console.log('CURRENT MATCHING ENDPOINT:' + currentEndpoint);

    if( currentEndpoint.match(hostOriginRegExp) ) { // konsole.studio == konsole.studio
      console.log('[Proxy] Will proxy domain: ' + currentEndpoint);
      proxyInstance = proxy(currentEndpoint, proxyOptions);
      proxyInstance(req, res, next);
    }
  }
});

proxyOptions = {

  preIntercept: function(res) {
    // If we must preIntercept something
  },

  decorateRequest: function(req) {
    req.headers[ 'Accept-Encoding' ] = 'utf8';
    delete req.headers['if-modified-since'];
    delete req.headers['if-none-match'];
    return req;
  },

  intercept: function(rsp, data, req, res, callback) {
    var contentType = res._headers['content-type'];
    var mappingUrl = req.originalUrl;

    // hostPath = req.headers['referer'];
    // console.log('loganderson ' + hostPath)

    if ( contentType ) {
      if( contentType.match(/html/g) ) {

        if( typeof req.headers['referer'] == 'string' ) {
          hostPath = req.headers['referer'];
          console.log('Host REFER: ', hostPath);
        } else {
          hostPath = req.headers['host'];
          console.log('Host Without refer: ', hostPath);
        }

        /* Define Host and HostVar */
        defineHostVariables(req);

        /* Convert data into UTF-8 String */
        data = data.toString('utf8');

        /* Load Html into Cheerio to be our manageable DOM */
        $ = cheerio.load(data, {decodeEntities: false});

        // Start App core module
        //callback(null, data);
        require('./app/scripts/index.js')(callback, data, mappingUrl, contentType);
      } else {
        callback(null, data);
      }
    }
  }
}


//var mobileDomain = proxy('m.konsole.studio', proxyOptions);


var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

var httpPort = process.env.PORT || 80;
httpServer.listen(httpPort, function() {
  updateHostFile();
  console.log('Access your project on: ' + routesHost[0]);
});
//httpsServer.listen(8443);
