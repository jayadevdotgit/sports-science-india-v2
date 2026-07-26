import type { Metadata } from "next";
import "./globals.css";
import Loader from "@/components/loader/Loader";
import MouseGlow from "@/components/effects/MouseGlow";

export const metadata: Metadata = {
  title: "Sports Science India | Perform Better, Recover Smarter",
  description:
    "Sports science assessments, performance analysis, rehabilitation and athlete development in Bhubaneswar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
     <body className="min-h-full flex flex-col bg-[#050505]">

      <Loader />

      <div className="relative">

        <MouseGlow />

        {children}

      </div>

    </body>
    </html>
  );
}
