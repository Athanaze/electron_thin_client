const { app, BrowserWindow, session, Menu } = require('electron');
const path = require('path');

let mainWindow;

// Performance optimizations for Linux
// These flags help with startup time, especially in AppImage format
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox');
  app.commandLine.appendSwitch('disable-gpu-sandbox');
  app.commandLine.appendSwitch('disable-dev-shm-usage');
}

// Uncomment this if you experience graphics issues on Linux
// app.disableHardwareAcceleration();

function createWindow() {
  // Hide the menu bar (File, Edit, etc.)
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'LEX IDE',
    backgroundColor: '#ffffff',
    show: true, // Show immediately for better perceived performance
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      // Enable web security but allow localhost
      webSecurity: true,
      // Allow running insecure content from localhost
      allowRunningInsecureContent: false,
      // Enable features needed for camera/microphone
      enableBlinkFeatures: 'MediaStreamTrack',
    },
  });

  // Set permissions handler for camera, microphone, and file access
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    // Automatically grant permissions for media devices and file access
    const allowedPermissions = [
      'media',
      'mediaKeySystem',
      'geolocation',
      'notifications',
      'midi',
      'midiSysex',
      'pointerLock',
      'fullscreen',
      'openExternal',
      'hid',
      'serial',
      'clipboard-sanitized-write',
    ];

    if (allowedPermissions.includes(permission)) {
      callback(true);
    } else {
      callback(false);
    }
  });

  // Set permission check handler
  session.defaultSession.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    const allowedPermissions = [
      'media',
      'mediaKeySystem',
      'geolocation',
      'notifications',
      'midi',
      'midiSysex',
      'pointerLock',
      'fullscreen',
      'openExternal',
      'hid',
      'serial',
    ];

    return allowedPermissions.includes(permission);
  });

  // Allow file access
  session.defaultSession.setDevicePermissionHandler((details) => {
    return true;
  });

  // Load the localhost URL
  mainWindow.loadURL('http://localhost:5050').catch((err) => {
    console.error('Failed to load URL:', err);
    // Optionally show an error page or retry logic
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open DevTools in development (optional, can be removed)
  // mainWindow.webContents.openDevTools();
}

// Request media access on macOS
if (process.platform === 'darwin') {
  const { systemPreferences } = require('electron');

  app.whenReady().then(() => {
    // Request microphone access
    systemPreferences.askForMediaAccess('microphone').catch((err) => {
      console.error('Failed to request microphone access:', err);
    });

    // Request camera access
    systemPreferences.askForMediaAccess('camera').catch((err) => {
      console.error('Failed to request camera access:', err);
    });
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, applications stay active until user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
