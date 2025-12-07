import type { CapacitorConfig } from "@capacitor/cli";

const isDev = process.env.NODE_ENV !== "production";

// In dev, we assume Next dev server on the host machine.
// Android emulator usually uses 10.0.2.2 as alias for localhost.
const devServerUrl = "http://10.0.2.2:3000";

// In production this should be the deployed Next.js URL.
const prodServerUrl = "https://next-wora.dev";

const config: CapacitorConfig = {
    appId: "com.nextwora.app",
    appName: "NextWoraApp",
    webDir: "www",
    server: {
        url: isDev ? devServerUrl : prodServerUrl,
        cleartext: isDev
    }
};

export default config;
