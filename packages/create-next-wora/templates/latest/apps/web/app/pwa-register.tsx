"use client";

import { useEffect } from "react";

export default function PwaRegister() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!("serviceWorker" in navigator)) return;

        const register = async () => {
            try {
                await navigator.serviceWorker.register("/sw.js");
                console.log("[PWA] Service worker registered");
            } catch (err) {
                console.error("[PWA] Service worker registration failed", err);
            }
        };

        void register();
    }, []);

    return null;
}
