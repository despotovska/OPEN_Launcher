var path = require('path');

var env = require('./env.js');

var _rootPath = path.join(__dirname, (env === 'dev') ? '../src/' : '../');
var _imagesPath = path.join(_rootPath, '/assets/images/');

module.exports = {
  rootPath: _rootPath,
  dbPath: path.join(_rootPath, '/assets/db.json'),
  indexPath: path.join(_rootPath, '/index.html'),
  avatarsPath: path.join(_imagesPath, '/avatars/'),
  relativeAvatarPath: './assets/images/avatars/',
  pointersPath: path.join(_imagesPath, '/pointer/'),
  relativePointersPath: './assets/images/pointer/',
  gamesPath: path.join(_rootPath, '/assets/games/')
};
