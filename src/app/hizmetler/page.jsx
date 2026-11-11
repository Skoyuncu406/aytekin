
import { Suspense } from "react";
import ServicesPage from "@/components/ServicesPage";

/* =========================================
   AYTEKİN OTOMASYON
   SERVICES PAGE SEO
========================================= */

const siteUrl = "https://www.aytekinotomasyon.com";

const pageUrl = `${siteUrl}/hizmetler`;

const pageTitle =
  "Gaziantep Otomatik Kapı, Kepenk, Panjur ve Pergola Sistemleri";

const pageDescription =
  "Gaziantep Aytekin Otomasyon; otomatik kapı, kepenk, panjur, tente, pergola ve modern otomasyon sistemleri için profesyonel çözümler sunar. Hizmetlerimizi inceleyin.";

/* =========================================
   PAGE METADATA
========================================= */

export const metadata = {
  title: {
    absolute: `${pageTitle} | Aytekin Otomasyon`,
  },

  description: pageDescription,

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Aytekin Otomasyon",
    title: `${pageTitle} | Aytekin Otomasyon`,
    description: pageDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Aytekin Otomasyon`,
    description: pageDescription,
  },
};

/* =========================================
   SERVICES PAGE
========================================= */

export default function HizmetlerPage() {
  return (
    <Suspense fallback={null}>
      <ServicesPage />
    </Suspense>
  );
}
