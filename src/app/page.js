import Corporate from "@/components/Corporate";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";

/* =========================================
   AYTEKİN OTOMASYON
   HOME PAGE SEO
========================================= */

const siteUrl = "https://www.aytekinotomasyon.com";

export const metadata = {
  title: {
    absolute: "Gaziantep Otomasyon Sistemleri | Aytekin Otomasyon",
  },

  description:
    "Aytekin Otomasyon, Gaziantep'te otomatik kapı, kepenk, panjur, pergola ve otomasyon sistemleri sunar. Profesyonel çözümlerimiz ve projelerimiz için teklif alın.",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Gaziantep Otomasyon Sistemleri | Aytekin Otomasyon",

    description:
      "Gaziantep'te otomatik kapı, kepenk, panjur ve pergola sistemleri. Aytekin Otomasyon'un profesyonel çözümlerini keşfedin.",

    url: siteUrl,
    siteName: "Aytekin Otomasyon",
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Gaziantep Otomasyon Sistemleri | Aytekin Otomasyon",

    description:
      "Gaziantep otomatik kapı, kepenk, panjur ve pergola sistemleri. Aytekin Otomasyon ile iletişime geçin.",
  },
};

/* =========================================
   HOME PAGE
========================================= */

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip">
      <Hero />
      <Corporate />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
