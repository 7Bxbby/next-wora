import type { Metadata } from "next";
import "./globals.css";
import PwaRegister from "./pwa-register";
import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "next-wora v0 app",
    description:
        "Minimal Next.js App Router template, PWA-ready and mobile-ready via Capacitor."
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={` antialiased ${poppins.variable} bg-[var(--color-background)] text-[var(--color-foreground)]`}
        >
        {children}
        <PwaRegister />
        </body>
        </html>
    );
}
