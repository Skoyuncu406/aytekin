
import {
  MapPin,
  PhoneCall,
  MessageCircle,
  ArrowUpRight,
  Navigation,
} from "lucide-react";

import "./ContactSection.css";

const phone = "0553 130 44 58";
const phoneHref = "tel:+905531304458";

const address =
  "Mavikent Mahallesi, Şahinbey Sanayi Sitesi, Şahinbey / Gaziantep";

const mapQuery =
  "Şahinbey Sanayi Sitesi, Mavikent Mahallesi, Şahinbey, Gaziantep";

const mapEmbed =
  `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;

const directionsHref =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

const whatsappHref =
  "https://wa.me/905531304458?text=" +
  encodeURIComponent(
    "Merhaba Aytekin Otomasyon, hizmetleriniz hakkında bilgi almak istiyorum."
  );

export default function ContactSection() {
  return (
    <section
      id="iletisim"
      className="ay-contact-section"
      aria-labelledby="ay-contact-heading"
    >
      <div
        className="ay-contact-background"
        aria-hidden="true"
      />

      <div className="ay-contact-container">
        {/* SECTION HEADER */}
        <header className="ay-contact-intro">
          <div className="ay-contact-eyebrow">
            <span />
            İLETİŞİM
          </div>

          <h2 id="ay-contact-heading">
            Bizimle <em>İletişime Geçin.</em>
          </h2>

          <p>
            Projeniz için doğru otomasyon çözümünü
            birlikte belirleyelim. Bilgi ve teklif
            talepleriniz için bize ulaşabilirsiniz.
          </p>
        </header>

        {/* MAIN CONTENT */}
        <div className="ay-contact-layout">
          {/* CONTACT INFORMATION */}
          <div className="ay-contact-information">
            <div className="ay-contact-info-item">
              <div className="ay-contact-info-icon">
                <MapPin
                  size={19}
                  strokeWidth={1.5}
                />
              </div>

              <div className="ay-contact-info-content">
                <span className="ay-contact-info-label">
                  ADRESİMİZ
                </span>

                <h3>{address}</h3>

                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ay-contact-text-link"
                >
                  Yol Tarifi Al
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="ay-contact-info-item">
              <div className="ay-contact-info-icon">
                <PhoneCall
                  size={19}
                  strokeWidth={1.5}
                />
              </div>

              <div className="ay-contact-info-content">
                <span className="ay-contact-info-label">
                  TELEFON
                </span>

                <h3>
                  <a href={phoneHref}>
                    {phone}
                  </a>
                </h3>

                <a
                  href={phoneHref}
                  className="ay-contact-text-link"
                >
                  Telefon ile Ara
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="ay-contact-info-item">
              <div className="ay-contact-info-icon">
                <MessageCircle
                  size={19}
                  strokeWidth={1.5}
                />
              </div>

              <div className="ay-contact-info-content">
                <span className="ay-contact-info-label">
                  WHATSAPP
                </span>

                <h3>Hızlı İletişim</h3>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ay-contact-text-link"
                >
                  WhatsApp'tan Yazın
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="ay-contact-bottom">
              <span className="ay-contact-bottom-line" />

              <p>
                Aytekin Otomasyon
                <span>Gaziantep, Türkiye</span>
              </p>
            </div>
          </div>

          {/* MAP */}
          <div className="ay-contact-map-column">
            <div className="ay-contact-map-top">
              <span>KONUMUMUZ</span>
              <span>ŞAHİNBEY / GAZİANTEP</span>
            </div>

            <div className="ay-contact-map">
              <iframe
                title="Aytekin Otomasyon - Şahinbey Sanayi Sitesi Konumu"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* PREMIUM TEXT LINK */}
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ay-contact-map-link"
            >
              <span className="ay-contact-map-link-label">
                <Navigation
                  size={17}
                  strokeWidth={1.5}
                />

                Google Maps ile Yol Tarifi Al
              </span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="ay-contact-map-link-arrow"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
