var fs = require('fs');
var multer = require("multer");
var paths = require('./paths.js');

function _readFiles(dirname, onSuccess, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    onSuccess(filenames);
  });
}

var fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, paths.avatarsPath);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});
var _upload = multer({ storage: fileStorage }).single('userPhoto');

module.exports = {
  readFiles: _readFiles,
  upload: _upload
};
