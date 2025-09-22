# Simple Slot Lucky Draw

A cross-platform, offline-capable, installable web app (PWA) built with Vite + React. Works on all modern browsers and devices.

## Features
- Offline support (PWA, works after first load)
- Installable on desktop and mobile (Add to Home Screen)
- Responsive, fullscreen, and borderless UI
- Asset paths and manifest configured for all platforms

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Build the app
```bash
npm run build
```

### 3. Preview the production build
```bash
npm run preview
```
Open the provided local URL in your browser.

### 4. Test PWA features
- Open DevTools > Application > Manifest to check installability.
- Use the browser's install prompt to add the app to your desktop or home screen.
- Test offline: Close the server, reload the installed app. It should work offline.

## Asset Management
- Place public assets (e.g., icons) in the `public/` folder for direct access.
- Import images in React code for automatic bundling.

## Building for Desktop (Electron)
- To build a native desktop app, use Electron and run:
  ```bash
  npm run pack
  ```
- For macOS builds, you must run this on a Mac.

## Notes
- True window transparency is only possible in Electron, not in browsers.
- For universal support, use the PWA build.

---

**Enjoy your offline, cross-platform slot lucky draw app!**
