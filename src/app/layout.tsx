// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <head>
        <title>VenomLabs</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
