// Preload script - runs in renderer process before web content loads
// This provides a secure bridge between the main and renderer processes

const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});

// Note: The web application running on localhost:5050 will have full access
// to its own APIs. This preload script maintains security boundaries while
// allowing the Electron app to provide necessary permissions for file access
// and media devices.
