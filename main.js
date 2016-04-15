require('./backend/api.js');
const env = require('./backend/env.js');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    minWidth: 900,
    minHeight: 900,
    icon: __dirname + '/favicon.png'
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Tell Electron where to load the entry point from
  if (env === 'dev') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  }

  // Clear out the main window when the app is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
