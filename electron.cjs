const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 600,
    minHeight: 400,
    transparent: true, // Keep transparent
    frame: false, // Disable frame for transparency to work
    resizable: true, // Allow resizing
    fullscreenable: true, // Allow fullscreen
    alwaysOnTop: false,
    hasShadow: false, // Disable shadow for full transparency
    titleBarStyle: 'hidden', // Hide title bar but keep window controls
    webPreferences: {
      nodeIntegration: true, // Enable for ipcRenderer access
      contextIsolation: false, // Disable for simple ipcRenderer access
      enableRemoteModule: false,
      webSecurity: false // Allow loading local files
    }
  });

  // Add custom drag region and window controls
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.insertCSS(`
      body {
        -webkit-app-region: no-drag; /* Make body NOT draggable by default */
      }
      .drag-region {
        -webkit-app-region: drag; /* Only specific areas are draggable */
      }
      button, input, select, textarea, a, [onclick], [role="button"] {
        -webkit-app-region: no-drag; /* Ensure all interactive elements are clickable */
      }
      .window-controls {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        -webkit-app-region: no-drag;
        display: flex;
        gap: 5px;
      }
      .drag-handle {
        position: fixed;
        top: 10px;
        left: 10px;
        width: 100px;
        height: 30px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px dashed rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        z-index: 9999;
        -webkit-app-region: drag;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        cursor: move;
      }
      .drag-handle:hover {
        background: rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.9);
      }
      .window-control-btn {
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .window-control-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      .minimize-btn:hover { background: rgba(255, 193, 7, 0.8); }
      .maximize-btn:hover { background: rgba(40, 167, 69, 0.8); }
      .close-btn:hover { background: rgba(220, 53, 69, 0.8); }
    `);
    
    mainWindow.webContents.executeJavaScript(`
      // Add window controls
      const controls = document.createElement('div');
      controls.className = 'window-controls';
      controls.innerHTML = \`
        <button class="window-control-btn minimize-btn" onclick="window.minimize()" title="Minimize">−</button>
        <button class="window-control-btn maximize-btn" onclick="window.toggleMaximize()" title="Maximize/Restore">□</button>
        <button class="window-control-btn close-btn" onclick="window.close()" title="Close">×</button>
      \`;
      document.body.appendChild(controls);
      
      // Add drag handle
      const dragHandle = document.createElement('div');
      dragHandle.className = 'drag-handle';
      dragHandle.innerHTML = '≡ Drag';
      dragHandle.title = 'Drag to move window';
      document.body.appendChild(dragHandle);
      
      // Only allow double-click to maximize on the drag handle
      dragHandle.addEventListener('dblclick', () => {
        window.toggleMaximize();
      });
      
      // Expose window controls to global scope
      window.minimize = () => require('electron').ipcRenderer.invoke('window-minimize');
      window.toggleMaximize = () => require('electron').ipcRenderer.invoke('window-toggle-maximize');
      window.close = () => require('electron').ipcRenderer.invoke('window-close');
    `);
  });

  // Handle window control events
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });

  if (isDev) {
    // Development: load from Vite dev server
    mainWindow.loadURL('http://localhost:5175');
    mainWindow.webContents.openDevTools(); // Open dev tools in development
  } else {
    // Production: load from built files
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
    // Uncomment the next line to debug production issues:
    // mainWindow.webContents.openDevTools();
  }
  
  mainWindow.setIgnoreMouseEvents(false); // Set to true if you want clicks to pass through
}

// IPC handlers for window controls
ipcMain.handle('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window-toggle-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) mainWindow.close();
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});