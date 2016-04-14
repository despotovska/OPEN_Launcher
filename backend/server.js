var express = require("express");
var bodyParser = require('body-parser');

var rootPath = require('./paths.js').rootPath;
var env = require('./env.js');

var server = express();

server.use(bodyParser.json());                         // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// == WEBPACK-MIDDLEWARE ========================================
if (env === 'dev') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  var config = require('../webpack.config');
  var compiler = webpack(config);

  server.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true, chunks: false }
  }));
  server.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}
// == WEBPACK-MIDDLEWARE ========================================

server.use(express.static(rootPath));

module.exports = server;
