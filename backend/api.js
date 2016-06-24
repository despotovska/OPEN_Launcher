var server = require('./server.js');
var db = require('./db.js');
var stats = require('./stats.js')
var paths = require('./paths.js');
var helpers = require('./helpers.js');
var childProcess = require('child_process');
var guidGenerator = require('guid');
var isGameStarted = false;
var loggedUser = '';

server.get('/', function (req, res) {
  res.sendFile(paths.indexPath);
});

server.get('/api/GetProfileImages', function (req, res) {
  helpers.readFiles(paths.avatarsPath,
    function (data) {
      for (var index = 0; index < data.length; index++) {
        data[index] = paths.relativeAvatarPath + data[index];
      }
      return res.send(data);
    },
    function (error) {
      throw error;
    });
});

server.get('/api/GetPointerImages', function (req, res) {
  helpers.readFiles(paths.pointersPath,
    function (data) {
      for (var index = 0; index < data.length; index++) {
        data[index] = paths.relativePointersPath + data[index];
      }
      return res.send(data);
    },
    function (error) {
      throw error;
    });
});

server.post('/api/upload', function (req, res) {
  helpers.upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

server.get('/api/getAllUsers/:name?', function (req, res) {
  if (req.params.name != undefined) {
    res.send(db('users').find({ name: req.params.name }));
  } else {
    res.send(db('users').value());
  }
});

server.post('/api/addUser', function (req, res) {
  db('users').push(req.body)
    .then(post => res.send({ data: db('users').value() }));
});

server.get('/api/isExistingUser/:username', function (req, res) {
  var existingUser = db('users').find({ name: req.params.username });
  if (existingUser) {
    res.send(true);
  } else {
    res.send(false);
  }
});

server.get('/api/deleteUser/:name', function (req, res) {
  db('users').remove({ name: req.params.name });
  res.send(db('users').value());
});

server.get('/api/login/:username', function (req, res) {
  loggedUser = req.params.username;
  console.log(loggedUser);
  res.send(true);
});

server.get('/api/getUserSettings/:username?', function (req, res) {
  var username = req.params.username;
  if (username != undefined) {
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

server.post('/api/saveUserSettings/:username?', function (req, res) {
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

server.get('/api/login/:username', function (req, res) {
  loggedUser = req.params.username;
  res.send(true);
});

server.get('/api/logout/', function (req, res) {
  loggedUser = undefined;
  res.send(true);
});

server.get('/api/startGame', function (req, res) {
  var startCommand = req.param('startCommand');
  startCommand = startCommand.replace('{gamesPath}', paths.gamesPath);

  var cp = childProcess.exec(startCommand, function (error, stdout, stderr) {
    this.isGameStarted = false;
  });

  this.isGameStarted = true;
  res.status(200);
  res.send({});
});

server.get('/api/isGameStarted', function (req, res) {
  res.send(!!this.isGameStarted);
})

server.get('/api/gameStarted/:gameName', function (req, res) {
  var gameName = req.params.gameName;
  var time = new Date().toLocaleString();
  var guid = guidGenerator.create();
  var deviceType = getDeviceType('Aleksandra');

  if (guid || loggedUser ) {
    stats('sessions').push({
      SessionID: guid,
      Username: '',
      GameName: gameName,
      DeviceType: deviceType,
      StartTime: time,
      EndTime: '',
      IterationsPassed: 0,
      InvalidClicksCount: 0
    }).then(res.send(guid.value));
  }
  else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/gameEnded/:guid', function (req, res) {
  var time = new Date().toLocaleString();
  var guid = req.params.guid;

  var session = stats('sessions').find({ SessionID: req.params.guid });

  if (session) {
    stats('sessions')
      .chain()
      .find({ SessionID: req.params.guid })
      .assign({ EndTime: time })
      .value();
    res.send(time);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

server.get('/api/gameUpdate/:guid/:misses', function (req, res) {
  var time = new Date().toLocaleString();
  var guid = req.params.guid;
  var session = stats('sessions').find({ SessionID: req.params.guid });
  var misses = req.params.misses;
  if (session) {
    stats('sessions')
      .chain()
      .find({ SessionID: req.params.guid })
      .assign({ IterationsPassed: session.IterationsPassed + 1, InvalidClicksCount: session.InvalidClicksCount + parseInt(misses) })
      .value();
    res.send(time);
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }

});

function getDeviceType(username) {
  var loggedUser = db('users').find({ name: username });
  console.log(loggedUser);
  if (loggedUser != undefined) {
    var devicetype = loggedUser.userSettings.deviceType;
    return devicetype;
  }
}

server.listen(3000, function () {
  console.log("Working on port 3000");
});
