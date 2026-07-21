import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sports Science India | Perform Better, Recover Smarter",
  description:
    "Sports science assessments, performance analysis, rehabilitation and athlete development in Bhubaneswar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
