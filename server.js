var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var proxy = require('express-http-proxy');
var domain = require('domain');
var d = domain.create();
var sassMiddleware = require('node-sass-middleware');
fs = require('fs');
var path = require('path');
var cleanup = require('./cleanup').Cleanup(cleanupHosts);
cheerio = require('cheerio');

/* Site URL */
var siteUrl = 'pampaburger.com.br';

var originalHosts = '';

d.on('error', function(err) {
  console.error(err);
});

function defineHost(req) {
  host = req.headers.host;
  console.log('Host: ' + host);
  // if( host.match(/localhost/g) ) {
  //   hostVar = 'mlocal.';
  // } else {
  //   hostVar = 'm.';
  // }
  hostVar = 'mlocal.';
  console.log("Hostvar " + hostVar);
  hostComplete = hostVar + host;
  console.log('Complete: ' + hostComplete);
}

function updateHostFile(siteUrl, host) {
  fs.readFile('/etc/hosts', 'utf8', function (err, hostsContent) {
    if (err) {
      return console.log(err);
    }

      originalHosts = hostsContent;
      siteUrlRegex = new RegExp(siteUrl, 'g');

      if ( !hostsContent.match(siteUrlRegex) ) {
        newHostsContent = hostsContent + '\n# FIRST TOUCH AUTO GENERATED HOSTS'
                                       + '\n' + '127.0.0.1' + '\t' + 'mlocal.' + siteUrl;

        /* Verify if writeFile is successful to avoid Heroku issues */
        d.run(function() {
          fs.writeFile('/etc/hosts', newHostsContent, function (err) {
            if (err) throw err;
          });
        });
      }
  });
}

function cleanupHosts() {
  console.log('Restoring original /etc/hosts file...');
    fs.writeFileSync('/etc/hosts', originalHosts);
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});

app.use("/vendor", express.static(__dirname + '/app/assets/javascript/vendor'));

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

app.use('/', proxy(siteUrl, {

  intercept: function(rsp, data, req, res, callback) {
    var contentType = res._headers['content-type'];
    var mappingUrl = req.originalUrl;

    if ( contentType ) {
      if( contentType.match(/html/g) ) {

        /* Define Host and HostVar */
        defineHost(req);


        data = data.toString('utf8');
        /* Load Html into Cheerio to be our manageable DOM */
        $ = cheerio.load(data);
      }
    }

    // Start App core module
    require('./app/scripts/index.js')(callback, data, mappingUrl, contentType);
  }
}));

// app.use("/app", express.static(__dirname + '/ux'));

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

var httpPort = process.env.PORT || 80;
httpServer.listen(httpPort, function() {
  updateHostFile(siteUrl);
  console.log('Access your project on: ' + 'mlocal.' + siteUrl );
});
//httpsServer.listen(8443);
