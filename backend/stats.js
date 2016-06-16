var low = require('lowdb');
var lowdbStorage = require('lowdb/file-async');

var statsPath = require('./paths.js').statsPath;

module.exports = low(statsPath, {
  storage: lowdbStorage
})
