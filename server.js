var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var proxy = require('express-http-proxy');
fs = require('fs');
var cleanup = require('./cleanup').Cleanup(cleanupHosts);
cheerio = require('cheerio');

/* Site URL */
var siteUrl = 'pampaburger.com.br';

var originalHosts = '';

function defineHost(req) {
  host = req.headers.host;
  console.log('Host: ' + host);
  if( host.match(/localhost/g) ) {
    hostVar = 'mlocal.';
  } else {
    hostVar = 'm.';
  }
  console.log("Hostvar " + hostVar);
  hostComplete = hostVar + host;
  console.log('Complete: ' + hostComplete);
}

function updateHostFile(siteUrl, host) {
  fs.readFile('/etc/hosts', 'utf8', function (err, hostsContent) {
    if (err) {
      return console.log(err);
    }
    console.log("HOSTS CONTENT: " + hostsContent);

      originalHosts = hostsContent;
      siteUrlRegex = new RegExp(siteUrl, 'g');

      if ( !hostsContent.match(siteUrlRegex) ) {
        newHostsContent = hostsContent + '\n# FIRST TOUCH AUTO GENERATED HOSTS'
                                       + '\n' + '127.0.0.1' + '\t' + 'mlocal.' + siteUrl;

        /* Verify if readFile was successful to avoid Heroku issues */
        try {
          fs.writeFile('/etc/hosts', newHostsContent, function (err) {
            if (err) throw err;
          });
        } catch(error) {
          console.log('Couldn\'t modify hosts file, be sure to run the server as Root');
        }
      }
  });
}

function cleanupHosts() {
  console.log('Restoring original /etc/hosts file...');
    fs.writeFileSync('/etc/hosts', originalHosts);
};

app.use("/vendor", express.static(__dirname + '/app/assets/javascript/vendor'));

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
