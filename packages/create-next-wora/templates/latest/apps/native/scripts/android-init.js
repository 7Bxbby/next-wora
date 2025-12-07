#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const assetsDir = path.resolve(process.cwd(), "android/app/src/main/assets");

try {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log("√ Init script successful, run npm run android to launch the app");
} catch (error) {
  console.error("Failed to prepare Android assets directory", error);
  process.exit(1);
}
