
"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  ArrowUp,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";

import "./Footer.css";

const quickLinks = [
  {
    label: "Anasayfa",
    href: "/",
  },
  {
    label: "Hakkımızda",
    href: "/#hakkimizda",
  },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetler",
  },
  {
    label: "Galeri",
    href: "/galeri",
  },
  {
    label: "İletişim",
    href: "/#iletisim",
  },
];

const phone = "0553 130 44 58";
const phoneHref = "tel:+905531304458";

const whatsappHref =
  "https://wa.me/905531304458?text=" +
  encodeURIComponent(
    "Merhaba Aytekin Otomasyon, hizmetleriniz hakkında bilgi almak istiyorum."
  );

const mapQuery =
  "Şahinbey Sanayi Sitesi, Mavikent Mahallesi, Şahinbey, Gaziantep";

const directionsHref =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(mapQuery);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <footer className="ay-footer">
      <div className="ay-footer-container">
        {/* MAIN FOOTER */}
        <div className="ay-footer-main">
          {/* BRAND */}
          <div className="ay-footer-brand-column">
            <Link
              href="/"
              className="ay-footer-brand"
              aria-label="Aytekin Otomasyon Anasayfa"
            >
              <span className="ay-footer-brand-name">
                AYTEKİN
              </span>

              <span className="ay-footer-brand-subtitle">
                OTOMASYON
              </span>
            </Link>

            <p className="ay-footer-description">
              Endüstriyel otomasyon alanında güvenilir,
              yenilikçi ve sürdürülebilir çözümler
              sunuyoruz.
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ay-footer-brand-cta"
            >
              Projenizi Birlikte Planlayalım

              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
              />
            </a>
          </div>

          {/* NAVIGATION */}
          <div className="ay-footer-column">
            <h3 className="ay-footer-heading">
              KEŞFEDİN
            </h3>

            <nav
              className="ay-footer-links"
              aria-label="Footer navigasyon"
            >
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="ay-footer-link"
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div className="ay-footer-column">
            <h3 className="ay-footer-heading">
              İLETİŞİM
            </h3>

            <div className="ay-footer-contact-list">
              <a
                href={phoneHref}
                className="ay-footer-contact-item"
              >
                <Phone
                  size={16}
                  strokeWidth={1.5}
                />

                <span>{phone}</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ay-footer-contact-item"
              >
                <MessageCircle
                  size={16}
                  strokeWidth={1.5}
                />

                <span>WhatsApp İletişim</span>
              </a>

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ay-footer-contact-item ay-footer-address"
              >
                <MapPin
                  size={17}
                  strokeWidth={1.5}
                />

                <span>
                  Mavikent Mahallesi,
                  <br />
                  Şahinbey Sanayi Sitesi,
                  <br />
                  Şahinbey / Gaziantep
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT SIGNATURE */}
          <div className="ay-footer-signature">
            <span className="ay-footer-signature-line" />

            <p>
              GÜVENİLİR TEKNOLOJİ.
              <br />
              GÜÇLÜ ÇÖZÜMLER.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="ay-footer-bottom">
          <p>
            © {currentYear} Aytekin Otomasyon.
            Tüm hakları saklıdır.
          </p>

          <span className="ay-footer-bottom-divider" />

          <p className="ay-footer-bottom-location">
            Gaziantep, Türkiye
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="ay-footer-back-to-top"
            aria-label="Sayfanın başına dön"
          >
            Başa Dön

            <ArrowUp
              size={16}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
