# Accompanying repository for the Electron guide

![Sound Machine](https://rawgithub.com/bojzi/sound-machine/master/sketch/sound-machine.png)


The code I used for testing is:

const path = require('path')
const {app, BrowserWindow} = require('electron')

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'pepflashplayer.dll'))
app.commandLine.appendSwitch('ppapi-flash-version', '22.0.0.192')

app.on('window-all-closed', function() {
  app.quit()
})

let mainWindow = null
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    },
  })
  mainWindow.loadURL('http://www.adobe.com/software/flash/about/')
})
The arch of the plugin file is x64.