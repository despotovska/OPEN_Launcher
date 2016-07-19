var server = require('./server.js');
var db = require('./db.js');
var stats = require('./stats.js')
var paths = require('./paths.js');
var helpers = require('./helpers.js');
var childProcess = require('child_process');
var guidGenerator = require('guid');
var isGameStarted = false;
var loggedUser = undefined;
var gameHandler = null;

server.get('/', (req, res) => {
  res.sendFile(paths.indexPath);
});

server.get('/api/GetProfileImages', (req, res) => {
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

server.get('/api/GetPointerImages', (req, res) => {
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
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

server.get('/api/getAllUsers/:name?', (req, res) => {
  if (req.params.name != undefined) {
    res.send(db('users').find({ name: req.params.name }));
  } else {
    res.send(db('users').value());
  }
});

server.post('/api/addUser', (req, res) => {
  db('users').push(req.body)
    .then(post => res.send({ data: db('users').value() }));
});

server.get('/api/isExistingUser/:username', (req, res) => {
  var existingUser = db('users').find({ name: req.params.username });
  if (existingUser) {
    res.send(true);
  } else {
    res.send(false);
  }
});

server.get('/api/deleteUser/:name', (req, res) => {
  db('users').remove({ name: req.params.name });
  res.send(db('users').value());
});

server.get('/api/getUserSettings/:username?', (req, res) => {
  var username = req.params.username;
  if (username) {
    var user = db('users').find({ name: username })
    if (user != undefined) {
      res.send(user.userSettings);
    } else {
      res.status(404);
      res.send({ error: 'Not found' });
    }
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.post('/api/saveUserSettings/:username?', (req, res) => {
  var user = db('users').find({ name: req.params.username });
  var userSettings = req.body;
  if (user) {
    db('users')
      .chain()
      .find({ name: req.params.username })
      .assign({ userSettings: userSettings })
      .value();
    res.send(userSettings);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/login/:username', (req, res) => {
  loggedUser = req.params.username;
  res.send(true);
});

server.get('/api/logout/', (req, res) => {
  loggedUser = undefined;
  res.send(true);
});

server.get('/api/startGame', (req, res) => {
  var startCommand = req.param('startCommand');
  startCommand = startCommand.replace('{gamesPath}', paths.gamesPath);

  gameHandler = childProcess.exec(startCommand, (error, stdout, stderr) => {
    this.isGameStarted = false;
    gameHandler = null;
  });

  this.isGameStarted = true;
  res.status(200);
  res.send({});
});

server.get('/api/isGameStarted', (req, res) => {
  res.send(!!this.isGameStarted);
});

server.get('/api/terminateGameProcess', (req, res) => {
  if (gameHandler) {
    childProcess.exec('taskkill /PID ' + gameHandler.pid + ' /T /F', (error, stdout, stderr) => {
      res.status(200);
      res.send({});
    });
  } else {
    res.status(200);
    res.send({});
  }
});

server.get('/api/gameStarted/:gameName', (req, res) => {
  var gameName = req.params.gameName;
  var time = new Date().toLocaleString();
  var guid = guidGenerator.create();
  var deviceType = getDeviceTypeForLoggedUser();
  if (guid || loggedUser) {
    stats('sessions').push({
      SessionID: guid.value,
      Username: loggedUser,
      GameName: gameName,
      DeviceType: deviceType,
      StartTime: time,
      EndTime: '',
      IterationsPassed: 0,
      InvalidClicksCount: 0
    }).then(() => res.send(guid.value));
  }
  else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/gameUpdate', (req, res) => {
  var guid = req.param('guid');

  var session = stats('sessions').find({ SessionID: guid });
  var misses = req.param('misses');
  if (session) {
    stats('sessions')
      .chain()
      .find({ SessionID: guid })
      .assign({ IterationsPassed: session.IterationsPassed + 1, InvalidClicksCount: session.InvalidClicksCount + parseInt(misses) })
      .value();
    res.send(true);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/gameEnded/:guid', (req, res) => {
  var time = new Date().toLocaleString();
  var guid = req.params.guid;

  var session = stats('sessions').find({ SessionID: guid });
  if (session) {
    stats('sessions')
      .chain()
      .find({ SessionID: guid })
      .assign({ EndTime: time })
      .value();
    res.send(true);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/getLoggedUserStatistic/:gameName', function (req, res) {
  var gameName = req.params.gameName;
  if (loggedUser) {
    res.send(stats('sessions').filter({ Username: loggedUser, GameName: gameName }));
  }
  else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

function getDeviceTypeForLoggedUser() {
  var user = db('users').find({ name: loggedUser });
  return !!user ? user.userSettings.deviceType : '/';
}

server.listen(3000, () => {
  console.log("Working on port 3000");
});
