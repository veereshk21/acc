const express = require('express');
const logger = require('./logger');
var https = require('https');
var http = require('http');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;
const app = express();

const options = {
  key: fs.readFileSync(resolve('key.pem')),
  cert: fs.readFileSync(resolve('cert.pem'))
};
// setup middlewares
// setup(app);

// get the intended port number, use port 4000 if not provided
const port = argv.port || process.env.PORT || 4000;

// server to start in http mode port 4000
http.createServer(setup(app)).listen(port, function() {
  logger.appStarted(port);
});
// server to start in https mode port 5443
https.createServer(options, setup(app)).listen(5443, function() {
  logger.secureAppStarted(5443);
});

app.listen = function(err) {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

