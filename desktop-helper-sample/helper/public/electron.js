const { app, BrowserWindow } = require('electron');
const isDevelopment = require('electron-is-dev');
const path = require('path');

require('./server.js');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Configure electron development environment
  window.loadURL(
    isDevelopment
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDevelopment) {
    window.webContents.openDevTools({
      mode: 'detach',
    });
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
