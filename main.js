'use strict';

const path = require('path')
var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var configuration = require('./configuration');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;
app.commandLine.appendSwitch('--enable-npapi')

app.on('ready', function() {
  if (!configuration.readSettings('shortcutKeys')) {
    configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
  }

const pluginDir = path.join(__dirname, 'Lodop')

console.log(pluginDir)

  mainWindow = new BrowserWindow({
    // height: 700,
    // width: 368,
    // frame: false,
    // resizable: false,
    'web-preferences': {
      'plugins': true
      // 打包成 32 位才可以用，不知道为什么 64 位的不能生效，开发时也不能生效，暂时不能用于实际开发 by awu
      // 'extra-plugin-dirs': [
      //   pluginDir,
      //   path.join(pluginDir, 'NPCAOSOFT_WEB_PRINT_lodop.dll')
      // ]
    }

  });

  // mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
  // mainWindow.loadUrl('file://' + __dirname + '/app/demo-easy.html');
  mainWindow.loadUrl('file://' + __dirname + '/app/PrintSample1.html');

  setGlobalShortcuts();
});

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();

  var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
  var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

  globalShortcut.register(shortcutPrefix + '1', function() {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register(shortcutPrefix + '2', function() {
    mainWindow.webContents.send('global-shortcut', 1);
  });
}

ipc.on('close-main-window', function() {
  app.quit();
});

ipc.on('open-settings-window', function() {
  if (settingsWindow) {
    return;
  }

  settingsWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200
  });

  settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

  settingsWindow.on('closed', function() {
    settingsWindow = null;
  });
});

ipc.on('close-settings-window', function() {
  if (settingsWindow) {
    settingsWindow.close();
  }
});

ipc.on('set-global-shortcuts', function() {
  setGlobalShortcuts();
});
