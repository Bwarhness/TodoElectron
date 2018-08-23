import { app, BrowserWindow, screen, globalShortcut, Menu, MenuItem, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as file from './Utils/file';
let win, serve, miniwin;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  miniwin = new BrowserWindow({
    x: size.width - 800,
    y: 0,
    width: 800,
    height: size.height,
    alwaysOnTop: true,
    frame: false,
    resizable: false,
    movable: false
  });
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: size.height,
    alwaysOnTop: false,
    frame: true,
    resizable: true,
    movable: true
  });
  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
    miniwin.loadURL('http://localhost:4200');
  } else {
    var url = url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    win.loadURL(url);

    var miniUrl = url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/mini'
    })
    miniwin.loadURL(miniUrl);

  }


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  miniwin.webContents.on('did-finish-load', ()=>{
    miniwin.webContents.send('Navigate');
  });

  let isFocus = true;

  miniwin.on('hide', function(e) {
    isFocus = false;
    e.returnValue = undefined;
  });
  miniwin.on('show', function(e) {
    isFocus = true;
    miniwin.webContents.send('focus');
    e.returnValue = undefined;
  });

  globalShortcut.register('Ctrl+Alt+I', () => {
    if (isFocus) {
      miniwin.hide();
    } else {
      miniwin.show();
    }
    console.log('Ctrl+Alt+I is pressed');
  });
  file.GetFile();

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //   app.quit();
    // }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


ipcMain.on('getTasks', (event, arg) => {
  event.returnValue = file.bla;
});
ipcMain.on('saveTask', (event, arg) => {
  file.SaveFile(arg);
});
