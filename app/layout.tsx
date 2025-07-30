// 3. app/layout.js
// This is your root layout.

import "./globals.css";

export const metadata = {
  title: "Jambsmash Investments | Automation & Security Systems",
  description: "Pioneering solutions in automation, instrumentation, electrical, communication, and security systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
