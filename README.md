# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Simple Slot Lucky Draw

This project is a desktop slot machine app built with React, Vite, and Electron. You can run it as a web app or package it as a double-clickable desktop app for Windows or Linux.

## Quick Start (Web)

```bash
npm install
npm run dev
```

## Build a Desktop App for Windows

1. **Clone this repo and open a terminal in the project folder.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the React app:**
   ```bash
   npm run build
   ```
4. **Package the Electron app for Windows:**
   ```bash
   npm run pack -- --win
   ```
5. **Find your `.exe` file in the `dist/` folder.**
   - Example: `dist/Simple Slot Lucky Draw Setup 0.0.0.exe`
6. **Double-click the `.exe` to run or install the app.**

> **Note:**
> - The first time you run the `.exe`, Windows may show a warning. Click "More info" → "Run anyway".
> - You can customize the app icon by replacing `assets/icon.ico`.

## Build for Linux

```bash
npm run build
npm run pack
```
- Find the `.AppImage` in `dist/` and double-click to run on Linux.

## Build for macOS

1. **Clone this repo and open a terminal in the project folder.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the React app:**
   ```bash
   npm run build
   ```
4. **Package the Electron app for macOS:**
   ```bash
   npm run pack -- --mac
   ```
5. **Find your `.dmg` or `.app` file in the `dist/` folder.**
   - Example: `dist/Simple Slot Lucky Draw-0.0.0.dmg`
6. **Double-click the `.dmg` or `.app` to run or install the app.**

> **Note:**
> - You must build the macOS version on a Mac.
> - You can customize the app icon by replacing `assets/icon.icns` and updating your `package.json` if needed.

---

For development or advanced packaging, see the scripts in `package.json`.
