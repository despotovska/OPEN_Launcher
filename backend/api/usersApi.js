const server = require('../server.js');
const db = require('../db.js');

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

