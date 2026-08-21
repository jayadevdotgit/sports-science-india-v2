import type { Metadata } from "next";
import "./globals.css";
import Loader from "@/components/loader/Loader";
import MouseGlow from "@/components/effects/MouseGlow";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Kibo from "@/components/panda/Kibo";
import { site } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Sports Science India | Prevent Injury, Prolong Career",
    template: "%s | Sports Science India",
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: { canonical: site.url },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo/ssi-logo.-favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Sports Science India | Prevent Injury, Prolong Career",
    description: site.description,
    url: site.url,
    images: [{ url: `${site.url}${site.image}`, width: 1200, height: 630, alt: site.name }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Science India | Prevent Injury, Prolong Career",
    description: site.description,
    images: [`${site.url}${site.image}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": site.url,
    name: site.name,
    url: site.url,
    image: `${site.url}${site.image}`,
    logo: `${site.url}${site.image}`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.2961,
      longitude: 85.8245,
    },
    areaServed: ["India", "Odisha", "Bhubaneswar"],
    medicalSpecialty: "SportsMedicine",
    openingHours: "Mo-Su 10:00-20:00",
  };

  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/models/bodyMuscles.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505]">

        <Loader />

        <div className="relative">

          <MouseGlow />
          <SmoothScroll />

          {children}

        </div>
        <Kibo />
      </body>
    </html>
  );
}
