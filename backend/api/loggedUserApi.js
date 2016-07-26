const server = require('../server.js');
const db = require('../db.js');
const paths = require('../paths.js');
const childProcess = require('child_process');
const guidGenerator = require('guid');

var isGameStarted = false;
var loggedUser;
var gameHandler;

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
  if (guid && loggedUser) {
    db('sessions').push({
      sessionID: guid.value,
      username: loggedUser,
      gameName: gameName,
      deviceType: deviceType,
      startTime: time,
      endTime: '',
      iterationsPassed: 0,
      invalidClicksCount: 0
    }).then(() => res.send(guid.value));
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/gameUpdate', (req, res) => {
  var guid = req.param('guid');
  var misses = req.param('misses');

  var session = db('sessions').find({ sessionID: guid });
  if (session) {
    db('sessions')
      .chain()
      .find({ sessionID: guid })
      .assign({ iterationsPassed: session.iterationsPassed + 1, invalidClicksCount: session.invalidClicksCount + parseInt(misses) })
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

  var session = db('sessions').find({ sessionID: guid });
  if (session) {
    db('sessions')
      .chain()
      .find({ sessionID: guid })
      .assign({ endTime: time })
      .value();
    res.send(true);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/getLoggedUserStatistics/:gameName', function (req, res) {
  var gameName = req.params.gameName;
  if (loggedUser) {
    var validStatistics = db('sessions')
      .filter({ username: loggedUser, gameName: gameName })
      .filter((item) => !!item.endTime);
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
