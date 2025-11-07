# Electron Thin Client

A lightweight Electron application that provides a native desktop wrapper for a local web application running on `http://localhost:5050`. This thin client provides full access to local files, camera, and microphone without SSL certificate warnings or browser restrictions.

## Features

- **Full Local File Access**: Complete access to the local file system
- **Camera & Microphone Permissions**: Automatic permissions for media devices
- **No SSL Warnings**: Direct access to localhost without certificate issues
- **Cross-Platform**: Builds for Linux, macOS, and Windows
- **Single Binary Distribution**: Packaged as ASAR for easy distribution

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

## Installation

```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm start
```

Make sure your web application is running on `http://localhost:5050` before launching the Electron app.

## Building

### Build for all platforms:
```bash
npm run build
```

### Build for specific platforms:
```bash
# Linux only
npm run build:linux

# macOS only
npm run build:mac

# Windows only
npm run build:win
```

**Note**: Building for macOS requires a Mac, as code signing and notarization can only be done on macOS.

## Build Output

After building, the distribution files will be in the `dist/` directory:

- **Linux**: AppImage and .deb packages
- **macOS**: .dmg installer and .zip archive
- **Windows**: NSIS installer and portable executable

## Platform-Specific Notes

### macOS
- Camera and microphone permissions are requested on first use
- The app includes entitlements for hardened runtime
- For distribution, you'll need to sign and notarize the app with an Apple Developer account

### Windows
- Media permissions are typically granted by default
- Users can manage permissions through Windows Settings if needed

### Linux
- AppImage format requires no installation
- .deb packages can be installed with `dpkg` or through GUI package managers

## Configuration

To change the default URL, edit `main.js` and modify the `loadURL` call:

```javascript
mainWindow.loadURL('http://localhost:5050');
```

## Architecture

- **main.js**: Main Electron process, handles window creation and permissions
- **preload.js**: Secure bridge between main and renderer processes
- **build/entitlements.mac.plist**: macOS entitlements for hardened runtime

## Permissions

The application automatically grants the following permissions:
- Media devices (camera, microphone)
- File system access
- Geolocation
- Notifications
- Full screen
- Clipboard access

## Security Considerations

This application is designed as a "thin client" with minimal security restrictions to provide full access to local resources. It should only be used with trusted web applications running on localhost.

## License

MIT
