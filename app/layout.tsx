import React from "react";
import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Balakrishna Battula | Frontend Developer - Game Portfolio",
  description:
    "Frontend Developer portfolio designed as an interactive game. Explore skills, quests, and achievements.",
  icons: {
    icon: "/svg/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="retro">
      <body className="antialiased">{children}</body>
    </html>
  );
}
