import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayne Enterprises - Business Intelligence Dashboard",
  description: "Executive dashboard showcasing Wayne Enterprises key business metrics and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
