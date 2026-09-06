import type { Metadata } from "next";
import "./globals.css";

import Loader from "@/components/loader/Loader";
import MouseGlow from "@/components/effects/MouseGlow";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Kibo from "@/components/panda/Kibo";

import { site } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: "Sports Science India | Prevent Injury, Prolong Career",
    template: "%s | Sports Science India",
  },

  description: site.description,

  alternates: {
    canonical: site.url,
  },

  icons: {
    icon: [
      {
        url: site.favicon,
        type: "image/png",
      },
    ],

    shortcut: site.favicon,

    apple: [
      {
        url: site.favicon,
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Sports Science India | Prevent Injury, Prolong Career",
    description: site.description,
    url: site.url,
    locale: "en_IN",

    images: [
      {
        url: `${site.url}${site.image}`,
        width: 1200,
        height: 630,
        alt: "Sports Science India",
      },
    ],
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

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",

    "@id": `${site.url}/#organization`,

    name: site.name,
    url: site.url,

    description: site.description,

    logo: `${site.url}${site.logo}`,

    image: `${site.url}${site.image}`,

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

    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "State",
        name: "Odisha",
      },
      {
        "@type": "City",
        name: "Bhubaneswar",
      },
    ],

    medicalSpecialty: "SportsMedicine",

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",

        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],

        opens: "10:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="preload"
          href="/models/bodyMuscles.glb"
          as="fetch"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
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