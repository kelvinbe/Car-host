const {BrowserWindow, app, Menu} = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const squirrel = require('electron-squirrel-startup')

const isMac = process.platform === 'darwin'

require('@electron/remote/main').initialize()

function createWindow (){
    const win = new BrowserWindow({
        title:"Divvly",
        width:isDev ? 1500 : 800,
        height:900,
        movable:true,
        center:true,
        backgroundColor:'#fff',
        webPreferences:{
            enableRemoteModule:true,
            contextIsolation:true,
            nodeIntegration:true,
        }
    })

    //open devtools when in development
    if(isDev){
        win.webContents.openDevTools()
    }

    win.loadURL(isDev? 'http://localhost:3000':"https://divvly.io")
}
if (squirrel) app.quit();

app.whenReady().then(() => {
    createWindow()

    //implement menu
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    //Since macOS generally continues running even without any open windows, activating the app opens a new window
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

//menu template
const menu = [
   {
        label:"File",
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
   },
   {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
]
//Quits the app when all windows are closed (Windows and Linux)
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});