import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "next-wora app",
        short_name: "next-wora",
        start_url: "/",
        display: "standalone",
        background_color: "#05070a",
        theme_color: "#a020f0",
        description:
            "Next.js App Router boilerplate that runs as Web, PWA and inside a Capacitor shell.",
        icons: [
            {
                src: "/icons/icon512_maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icons/icon512_rounded.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            }
        ],
    };
}
