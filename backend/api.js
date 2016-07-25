const server = require('./server.js');
const db = require('./db.js');
const paths = require('./paths.js');
const helpers = require('./helpers.js');
const childProcess = require('child_process');
const guidGenerator = require('guid');

var isGameStarted = false;
var loggedUser;
var gameHandler;

server.get('/', (req, res) => {
  res.sendFile(paths.indexPath);
});

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

server.get('/api/getUsers/:name?', (req, res) => {
  if (req.params.name != undefined) {
    res.send(db('users').find({ name: req.params.name }));
  } else {
    res.send(db('users').value());
  }
});

server.post('/api/addUser', (req, res) => {
  db('users').push(req.body)
    .then(() => res.send({ data: db('users').value() }));
});

server.get('/api/isExistingUsername/:username', (req, res) => {
  var existingUser = db('users').find({ name: req.params.username });
  res.send(!!existingUser);
});

server.get('/api/devareUser/:name', (req, res) => {
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
    isGameStarted = false;
    gameHandler = undefined;
  });

  isGameStarted = true;
  res.status(200);
  res.send({});
});

server.get('/api/isGameStarted', (req, res) => {
  res.send(isGameStarted);
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
    db('sessions').push({
      SessionID: guid.value,
      Username: loggedUser,
      GameName: gameName,
      DeviceType: deviceType,
      StartTime: time,
      EndTime: '',
      IterationsPassed: 0,
      InvalidClicksCount: 0
    }).then(() => res.send(guid.value));
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/gameUpdate', (req, res) => {
  var guid = req.param('guid');
  var misses = req.param('misses');

  var session = db('sessions').find({ SessionID: guid });
  if (session) {
    db('sessions')
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

  var session = db('sessions').find({ SessionID: guid });
  if (session) {
    db('sessions')
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
    var validStatistics = db('sessions')
      .filter({ Username: loggedUser, GameName: gameName })
      .filter((item) => !!item.EndTime);
    res.send(validStatistics);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

function getDeviceTypeForLoggedUser() {
  var user = db('users').find({ name: loggedUser });
  return !!user ? user.userSettings.deviceType : '/';
}

server.listen(3000, () => {
  console.log('Working on port 3000');
});
