# Accompanying repository for the Electron guide

![Sound Machine](https://rawgithub.com/bojzi/sound-machine/master/sketch/sound-machine.png)

## nw by awu 
- v0.12.3. Is it still possible to load these NPAPI plugins 
- There is a trick on Windows that you have to name your plugin as np*, e.g. npMyPlugin.dll, and place it to your app's plugins/ folder
- the plugin built for x64 or x86? 64bit NW only load x64 plugins.
  ···
    "webkit": {
    "plugin": false
    }
  ···

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