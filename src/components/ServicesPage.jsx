
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./ServicesPage.css";
import { services, serviceUrl } from "../data/services";

const whatsappNumber = "905531304458";

function normalizeText(value = "") {
  return value.toLocaleLowerCase("tr-TR").trim();
}

function getServiceIndex(params) {
  const serviceId = params.get("service");
  const query = params.get("search");

  if (serviceId) {
    const index = services.findIndex(
      (service) => service.id === serviceId
    );

    if (index !== -1) {
      return index;
    }
  }

  if (query) {
    const normalizedQuery = normalizeText(query);

    const index = services.findIndex((service) =>
      [
        service.title,
        service.subtitle,
        service.lead,
      ].some((value) =>
        normalizeText(value).includes(normalizedQuery)
      )
    );

    if (index !== -1) {
      return index;
    }
  }

  return 0;
}

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeIndex, setActiveIndex] = useState(() =>
    getServiceIndex(searchParams)
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeService =
    services[activeIndex] ?? services[0];

  // URL değiştiğinde seçili hizmeti güncelle.
  useEffect(() => {
    const index = getServiceIndex(searchParams);

    setActiveIndex(index);
    setDrawerOpen(false);
  }, [searchParams]);

  // Mobil hizmet menüsü açıkken arka planı kilitle.
  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [drawerOpen]);

  // HİZMET SEÇİMİ
  const selectService = useCallback(
    (index) => {
      const service = services[index];

      if (!service) return;

      setActiveIndex(index);
      setDrawerOpen(false);

      router.replace(serviceUrl(service.id), {
        scroll: false,
      });

      if (window.innerWidth <= 900) {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
          top: 0,
          behavior: reducedMotion
            ? "instant"
            : "smooth",
        });
      }
    },
    [router]
  );

  // ÖNCEKİ HİZMET
  const goToPrevious = () => {
    const previousIndex =
      (activeIndex - 1 + services.length) %
      services.length;

    selectService(previousIndex);
  };

  // SONRAKİ HİZMET
  const goToNext = () => {
    const nextIndex =
      (activeIndex + 1) % services.length;

    selectService(nextIndex);
  };

  const whatsappHref =
    `https://wa.me/${whatsappNumber}?text=` +
    encodeURIComponent(
      `Merhaba Aytekin Otomasyon, ${activeService.title} hakkında bilgi ve teklif almak istiyorum.`
    );

  return (
    <main className="ay-services-page">
      <div
        className="ay-services-background"
        aria-hidden="true"
      />

      <div className="ay-services-shell">
        {/* PAGE HEADING */}
        <header className="ay-services-heading">
          <div className="ay-services-eyebrow">
            <span />
            HİZMETLERİMİZ
          </div>

          <h1>
            Akıllı <span>Çözümler.</span>
          </h1>

          <p>
            Yaşam alanlarınızı daha güvenli,
            konforlu ve işlevsel hale getiren
            otomasyon sistemlerimizi keşfedin.
          </p>
        </header>

        <div className="ay-services-layout">
          {/* DESKTOP SIDEBAR */}
          <aside
            className="ay-services-sidebar"
            aria-label="Hizmet listesi"
          >
            <div className="ay-services-sidebar-heading">
              <span>HİZMETLER</span>

              <span>
                01 — {String(services.length).padStart(2, "0")}
              </span>
            </div>

            <div className="ay-services-list">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  className={`ay-service-item ${
                    activeIndex === index
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() => selectService(index)}
                  aria-current={
                    activeIndex === index
                      ? "true"
                      : undefined
                  }
                >
                  <span className="ay-service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="ay-service-name">
                    {service.title}
                  </span>

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>

            <p className="ay-services-sidebar-note">
              İhtiyacınıza en uygun sistemi
              belirlemek için bizimle
              iletişime geçebilirsiniz.
            </p>
          </aside>

          {/* SERVICE DETAIL */}
          <section
            className="ay-services-detail"
            aria-label="Seçili hizmetin detayları"
          >
            <div className="ay-services-detail-top">
              {/* MOBILE SERVICE MENU BUTTON */}
              <button
                type="button"
                className="ay-services-mobile-toggle"
                onClick={() => setDrawerOpen(true)}
                aria-expanded={drawerOpen}
                aria-controls="ay-services-drawer"
              >
                <Menu
                  size={19}
                  strokeWidth={1.6}
                />

                <span>Hizmetleri Gör</span>
              </button>

              {/* PREVIOUS / NEXT */}
              <div className="ay-services-detail-navigation">
                <button
                  type="button"
                  className="ay-services-nav-button"
                  onClick={goToPrevious}
                  aria-label="Önceki hizmet"
                  title="Önceki hizmet"
                >
                  <ChevronLeft
                    size={19}
                    strokeWidth={1.6}
                  />
                </button>

                <div className="ay-services-counter">
                  {String(activeIndex + 1).padStart(2, "0")}

                  <span> / </span>

                  {String(services.length).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  className="ay-services-nav-button"
                  onClick={goToNext}
                  aria-label="Sonraki hizmet"
                  title="Sonraki hizmet"
                >
                  <ChevronRight
                    size={19}
                    strokeWidth={1.6}
                  />
                </button>
              </div>
            </div>

            {/* ACTIVE SERVICE CONTENT */}
            <div
              key={activeService.id}
              className="ay-services-detail-content"
            >
              <div className="ay-services-detail-label">
                AYTEKİN OTOMASYON / HİZMETLER
              </div>

              <h2>{activeService.title}</h2>

              <p className="ay-services-subtitle">
                {activeService.subtitle}
              </p>

              <div
                className="ay-services-detail-rule"
                aria-hidden="true"
              />

              <p className="ay-services-lead">
                {activeService.lead}
              </p>

              <div className="ay-services-paragraphs">
                {activeService.paragraphs.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}
              </div>

              {/* FEATURES */}
              <div className="ay-services-features">
                <div className="ay-services-features-title">
                  ÖNE ÇIKAN ÖZELLİKLER
                </div>

                <div className="ay-services-feature-grid">
                  {activeService.features.map(
                    (feature, index) => (
                      <div
                        className="ay-services-feature"
                        key={index}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p>{feature}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* WHATSAPP CTA */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ay-services-cta"
              >
                Bu Hizmet İçin Teklif Al

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.6}
                />
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE DRAWER BACKDROP */}
      <div
        className={`ay-services-drawer-backdrop ${
          drawerOpen ? "is-open" : ""
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* MOBILE SERVICE DRAWER */}
      <aside
        id="ay-services-drawer"
        className={`ay-services-drawer ${
          drawerOpen ? "is-open" : ""
        }`}
        aria-label="Mobil hizmet seçimi"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div className="ay-services-drawer-header">
          <div>
            <span>AYTEKİN OTOMASYON</span>

            <h2>Hizmetlerimiz</h2>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Hizmet menüsünü kapat"
          >
            <X
              size={19}
              strokeWidth={1.6}
            />
          </button>
        </div>

        <div className="ay-services-drawer-list">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              className={`ay-services-drawer-item ${
                activeIndex === index
                  ? "is-active"
                  : ""
              }`}
              onClick={() => selectService(index)}
              aria-current={
                activeIndex === index
                  ? "true"
                  : undefined
              }
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>
                {service.title}
              </strong>

              <ArrowRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </aside>
    </main>
  );
}
