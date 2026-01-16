import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
