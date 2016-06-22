var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: '../open_built/OPEN-win32-x64/',
  outputDirectory: '../installer/',
  authors: "Endava",
  owners: "OpenTheWindows",
  title: "Open Launcher",
  exe: 'OPEN.exe',
  loadingGif: 'progress.gif',
  setupIcon: 'Icon.ico',
  iconUrl: 'https://raw.githubusercontent.com/despotovska/OPEN_Launcher/master/Icon.ico',
  noMsi: true
});

resultPromise.then(() => console.log("Installer successfully created!"), (e) => console.log(`No dice: ${e.message}`));
