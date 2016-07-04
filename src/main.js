if (require('electron-squirrel-startup')) return;

if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) { }

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;
  }
};

require('./backend/api.js');
const env = require('./backend/env.js');

const http = require('http');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

var shouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
  return;
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on("before-quit", function (event) {
  http.get({
    hostname: 'localhost',
    port: 3000,
    path: '/api/terminateGameProcess',
    agent: false  // create a new agent just for this one request
  }, (res) => {
    app.exit(0);
  });

  event.preventDefault();
});

app.on('ready', function () {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 900,
    minHeight: 900,
    icon: __dirname + '/assets/images/Icon.png'
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Tell Electron where to load the entry point from
  if (env === 'dev') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  // Clear out the main window when the app is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
