import { Italiana, Outfit } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

/* =========================================
   FONTS
========================================= */

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/* =========================================
   SITE CONFIG
========================================= */

const siteUrl = "https://www.aytekinotomasyon.com";

const siteName = "Aytekin Otomasyon";

const siteDescription =
  "Aytekin Otomasyon, Gaziantep'te otomatik kapı, kepenk, panjur, pergola ve otomasyon sistemleri için profesyonel çözümler sunar. Projelerimizi keşfedin, teklif alın.";

/* =========================================
   GLOBAL SEO METADATA
========================================= */

export const metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default: "Gaziantep Otomasyon Sistemleri | Aytekin Otomasyon",
    template: "%s | Aytekin Otomasyon",
  },

  description: siteDescription,

  keywords: [
    "Aytekin Otomasyon",
    "Gaziantep otomasyon",
    "Gaziantep otomasyon sistemleri",
    "Gaziantep otomatik kapı",
    "Gaziantep otomatik kepenk",
    "Gaziantep panjur sistemleri",
    "Gaziantep pergola sistemleri",
    "otomatik kapı sistemleri",
    "otomatik kepenk sistemleri",
    "motorlu panjur",
    "pergola otomasyonu",
    "Şahinbey otomasyon",
    "Gaziantep kapı otomasyonu",
  ],

  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],

  creator: siteName,
  publisher: siteName,

  category: "business",

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

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName,
    title: "Gaziantep Otomasyon Sistemleri | Aytekin Otomasyon",
    description: siteDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: "Gaziantep Otomasyon Sistemleri | Aytekin Otomasyon",
    description: siteDescription,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* =========================================
   ROOT LAYOUT
========================================= */

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${italiana.variable} ${outfit.variable}`}>
        <LocalBusinessSchema />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
