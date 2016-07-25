const server = require('../server.js');
const paths = require('../paths.js');
const helpers = require('../helpers.js');

server.get('/api/getProfileImages', (req, res) => {
  helpers.readFiles(paths.avatarsPath,
    (data) => {
      for (var index = 0; index < data.length; index++) {
        data[index] = paths.relativeAvatarPath + data[index];
      }
      return res.send(data);
    },
    (error) => {
      throw error;
    });
});

server.get('/api/getPointerImages', (req, res) => {
  helpers.readFiles(paths.pointersPath,
    (data) => {
      for (var index = 0; index < data.length; index++) {
        data[index] = paths.relativePointersPath + data[index];
      }
      return res.send(data);
    },
    (error) => {
      throw error;
    });
});

server.post('/api/upload', (req, res) => {
  helpers.upload(req, res, (err) => {
    if (err) {
      return res.end('error');
    }
    res.end('uploaded');
  });
});
