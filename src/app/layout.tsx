import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: 'Pomodoro App',
  description: '25 minutes timer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
