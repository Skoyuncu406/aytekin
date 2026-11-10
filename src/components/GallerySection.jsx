
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import GalleryViewer from "./GalleryViewer";
import "./GallerySection.css";

const galleryImages = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    src: `/images/home-gallery/gallery-${String(
      index + 1
    ).padStart(2, "0")}.webp`,
    alt: `Aytekin Otomasyon çalışma görseli ${index + 1}`,
  })
);

export default function GallerySection() {
  return (
    <section
      id="galeri"
      className="ay-gallery-section"
      aria-labelledby="ay-gallery-heading"
    >
      <div className="ay-gallery-container">
        {/* SECTION HEADER */}
        <header className="ay-gallery-header">
          <div className="ay-gallery-eyebrow">
            <span />
            PROJELERİMİZDEN KARELER
          </div>

          <div className="ay-gallery-heading-row">
            <h2 id="ay-gallery-heading">
              İşimizden <em>İzler.</em>
            </h2>

            <p>
              Gerçekleştirdiğimiz otomasyon
              uygulamalarından seçilmiş karelerle
              çalışmalarımızı yakından keşfedin.
            </p>
          </div>
        </header>

        {/* SHARED GALLERY VIEWER */}
        <GalleryViewer images={galleryImages} />

        {/* MORE LINK */}
        <div className="ay-gallery-footer">
          <Link
            href="/galeri"
            className="ay-gallery-more-link"
          >
            Daha Fazlasını Keşfedin
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
