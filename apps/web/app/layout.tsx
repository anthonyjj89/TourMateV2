import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TourMate",
  description: "A modern tour booking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
