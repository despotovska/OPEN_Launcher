var low = require('lowdb');
var lowdbStorage = require('lowdb/file-async');

var dbPath = require('./paths.js').dbPath;

module.exports = low(dbPath, {
  storage: lowdbStorage
});
