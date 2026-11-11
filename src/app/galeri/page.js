import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import GalleryViewer from "@/components/GalleryViewer";

import "./gallery-page.css";

/* =========================================
   AYTEKİN OTOMASYON
   GALLERY PAGE SEO
========================================= */

const siteUrl = "https://www.aytekinotomasyon.com";

const pageUrl = `${siteUrl}/galeri`;

const pageTitle = "Gaziantep Otomasyon Projeleri ve Uygulama Galerisi";

const fullTitle = `${pageTitle} | Aytekin Otomasyon`;

const pageDescription =
  "Aytekin Otomasyon'un Gaziantep'teki otomatik kapı, kepenk, panjur, pergola ve otomasyon çalışmalarını galerimizde keşfedin. Projelerimizden seçilmiş görselleri inceleyin.";

/* =========================================
   PAGE METADATA
========================================= */

export const metadata = {
  title: {
    absolute: fullTitle,
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
    title: fullTitle,
    description: pageDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: pageDescription,
  },
};

/* =========================================
   GALLERY IMAGES
========================================= */

const galleryImages = Array.from({ length: 19 }, (_, index) => ({
  id: index + 1,

  src: `/images/gallery/gallery-${String(index + 1).padStart(2, "0")}.webp`,

  alt: `Aytekin Otomasyon otomatik kapı, kepenk ve otomasyon uygulamaları - galeri görseli ${
    index + 1
  }`,
}));

/* =========================================
   GALLERY PAGE
========================================= */

export default function GalleryPage() {
  return (
    <main className="ay-gallery-page">
      <div className="ay-gallery-page-container">
        {/* PAGE HEADER */}
        <header className="ay-gallery-page-header">
          <div className="ay-gallery-page-eyebrow">
            <span />
            AYTEKİN OTOMASYON
          </div>

          <div className="ay-gallery-page-heading">
            <div>
              <h1>
                Proje <em>Galerimiz.</em>
              </h1>

              <p>
                Gerçekleştirdiğimiz otomasyon uygulamalarını ve
                çalışmalarımızdan seçilmiş kareleri keşfedin.
              </p>
            </div>

            <div className="ay-gallery-page-count">
              <strong>{galleryImages.length}</strong>
              <span>PROJE GÖRSELİ</span>
            </div>
          </div>
        </header>

        {/* GALLERY */}
        <GalleryViewer images={galleryImages} />

        {/* BOTTOM CTA */}
        <footer className="ay-gallery-page-footer">
          <div>
            <span className="ay-gallery-page-footer-label">
              BİRLİKTE ÇALIŞALIM
            </span>

            <h2>
              Projenizi <em>Konuşalım.</em>
            </h2>
          </div>

          <Link href="/#iletisim" className="ay-gallery-page-contact">
            Bizimle İletişime Geçin
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
