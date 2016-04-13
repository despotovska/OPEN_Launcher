var app = require('app');
var expressServer = require('./Server');

// browser-window creates a native window
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({ width: 1200, height: 900 });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

  // Clear out the main window when the app is closed
  mainWindow.on('closed', function() {

    mainWindow = null;
  });

});
