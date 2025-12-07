# Next-Wora template

A ready-to-code starter for Next.js (App Router) with PWA configuration and native shell.

## What’s inside
- Next.js 16 App Router (`apps/web`)
- PWA-ready: manifest, icons, service worker stub, client registration
- Native shell (`apps/native`) that points to the web app via `server.url`

## Requirements
- Node.js 18+ (20+ recommended) and npm 9+
- For Android: Android Studio/SDK + Java 17–21

## Getting started
Install deps at the template root:
```bash
npm install
```

Run the web/PWA dev server:
```bash
npm run dev:web
# http://localhost:3000
```

## Build / start web
```bash
npm run build:web
npm run start:web
```

## Configure the native shell
Set the web server URL in `apps/native/capacitor.config.ts`:
- Android emulator (might be different for you): `http://10.0.2.2:3000`
- Device on LAN: `http://<your-LAN-ip>:3000`

## Build / start Android
```bash
npm run android:init   # one time: adds platform + prepares assets
npm run dev:web        # in v1 native app works as WebView pointing to your website server
npm run android        # launches Android via Capacitor
```

If your npm setup does not support workspaces, run inside the native app:
```bash
cd apps/native
npm install
npm run android:init
npm run android
```
