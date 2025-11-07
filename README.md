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

## Automated Releases with GitHub Actions

This repository includes a GitHub Actions workflow that automatically builds and releases the application for all platforms when you push a version tag. **This is completely FREE for public repositories!**

### How to Create a Release:

1. Update the version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Push the tag to GitHub:
   ```bash
   git push && git push --tags
   ```

3. GitHub Actions will automatically:
   - Build the app for Linux, macOS, and Windows
   - Create a GitHub Release with all build artifacts
   - Upload AppImage, .deb, .dmg, .zip, .exe, and portable executables

### What Gets Built:

- **Linux**:
  - `Thin-Client-x.x.x.AppImage` (no installation required)
  - `thin-client_x.x.x_amd64.deb` (Debian/Ubuntu package)
- **macOS**:
  - `Thin-Client-x.x.x.dmg` (installer)
  - `Thin-Client-x.x.x-mac.zip` (archive)
- **Windows**:
  - `Thin-Client-Setup-x.x.x.exe` (NSIS installer)
  - `Thin-Client-x.x.x.exe` (portable executable)

### Viewing Releases:

After the workflow completes (usually 5-10 minutes), visit:
```
https://github.com/YOUR_USERNAME/electron_thin_client/releases
```

All build artifacts will be available for download in the release page.

### Optional: macOS Code Signing

For macOS code signing and notarization, you need to add these secrets to your repository:
- `MAC_CERTS`: Base64-encoded certificate (.p12)
- `MAC_CERTS_PASSWORD`: Certificate password

Without these, the macOS builds will work but won't be signed.

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
