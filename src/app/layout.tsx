import type { Metadata } from "next";
import { Montserrat, Allura, Yellowtail } from "next/font/google";
import "./globals.css";

// Font optimization with next/font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rembayung.my"),
  title: "Rembayung | Masakan Kampung Autentik by Khairul Aming",
  description:
    "Rembayung adalah restoran pertama Khairul Aming di Kampung Baru, Kuala Lumpur — menyajikan masakan kampung autentik dalam suasana yang menggabungkan tradisi dengan kemewahan moden. Tempah meja anda sekarang.",
  keywords: [
    "Rembayung",
    "Khairul Aming",
    "restoran Kampung Baru",
    "masakan kampung",
    "Malaysian restaurant",
    "masakan Melayu",
    "Sambal Nyet",
    "tempahan restoran KL",
  ],
  authors: [{ name: "Khairul Aming" }],
  creator: "Khairul Aming",
  openGraph: {
    title: "Rembayung | Masakan Kampung Autentik by Khairul Aming",
    description:
      "Rasai kehangatan kampung dalam setiap hidangan. Tempah pengalaman menjamu selera yang istimewa di Rembayung.",
    url: "https://rembayung.my",
    siteName: "Rembayung",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rembayung Restaurant",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rembayung | Masakan Kampung Autentik",
    description: "Restoran pertama Khairul Aming di Kampung Baru, KL",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Rembayung",
  image: "https://rembayung.my/images/og-image.jpg",
  "@id": "https://rembayung.my",
  url: "https://rembayung.my",
  telephone: "+60123456789",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kampung Baru",
    addressLocality: "Kuala Lumpur",
    addressRegion: "Wilayah Persekutuan",
    postalCode: "50300",
    addressCountry: "MY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 3.1632,
    longitude: 101.7001,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "22:00",
    },
  ],
  servesCuisine: ["Malaysian", "Malay", "Traditional"],
  founder: {
    "@type": "Person",
    name: "Khairul Aming",
  },
  description:
    "Rembayung adalah restoran pertama Khairul Aming di Kampung Baru, Kuala Lumpur — menyajikan masakan kampung autentik dalam suasana yang menggabungkan tradisi dengan kemewahan moden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      className={`${montserrat.variable} ${allura.variable} ${yellowtail.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1816" />
      </head>
      <body className="antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-md focus:font-semibold"
        >
          Langkau ke kandungan utama
        </a>
        {children}
      </body>
    </html>
  );
}
