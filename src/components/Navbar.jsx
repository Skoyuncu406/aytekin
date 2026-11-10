
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Search,
  PhoneCall,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { services, serviceUrl } from "../data/services";
import "./NavbarEnhancements.css";
import "./GalleryNav.css";

const navigation = [
  {
    label: "Hakkımızda",
    href: "/#hakkimizda",
    sectionId: "hakkimizda",
  },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetler",
  },
  {
    label: "Galeri",
    href: "/#galeri",
    sectionId: "galeri",
  },
  {
    label: "İletişim",
    href: "/#iletisim",
    sectionId: "iletisim",
  },
];

const phoneHref = "tel:+905531304458";

const whatsappHref =
  "https://wa.me/905531304458?text=" +
  encodeURIComponent(
    "Merhaba Aytekin Otomasyon, teklif almak istiyorum."
  );

function normalizeText(value = "") {
  return value.toLocaleLowerCase("tr-TR").trim();
}

function getHeaderHeight() {
  const header = document.querySelector(".ay-header");

  return header?.getBoundingClientRect().height ?? 82;
}

function Logo({ onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="ay-brand"
      aria-label="Aytekin Otomasyon Anasayfa"
    >
      <span className="ay-brand-main">AYTEKİN</span>
      <span className="ay-brand-sub">OTOMASYON</span>
    </Link>
  );
}

/* =========================================
   LIVE SEARCH
========================================= */

function SearchForm({
  value,
  onChange,
  onSubmit,
  onChoose,
  mobile = false,
}) {
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const normalized = normalizeText(value);

  const matches = normalized
    ? services.filter((service) =>
        normalizeText(service.title).includes(normalized)
      )
    : [];

  const visible = focused && normalized.length > 0;

  useEffect(() => {
    setSelectedIndex(-1);
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, []);

  const chooseService = (id) => {
    setFocused(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
    onChoose(id);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setFocused(false);
      setSelectedIndex(-1);
      event.currentTarget.blur();
      return;
    }

    if (!matches.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex(
        (index) => (index + 1) % matches.length
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((index) =>
        index <= 0
          ? matches.length - 1
          : index - 1
      );
      return;
    }

    if (
      event.key === "Enter" &&
      selectedIndex >= 0 &&
      matches[selectedIndex]
    ) {
      event.preventDefault();
      chooseService(matches[selectedIndex].id);
    }
  };

  const handleSubmit = (event) => {
    setFocused(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
    onSubmit(event);
  };

  return (
    <div
      ref={containerRef}
      className={`ay-live-search ${
        mobile ? "is-mobile" : ""
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={
          mobile ? "ay-menu-search" : "ay-search"
        }
        role="search"
      >
        {mobile ? (
          <span
            className="ay-search-symbol"
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 20,
              height: 20,
            }}
          >
            <Search
              size={20}
              strokeWidth={1.6}
            />
          </span>
        ) : (
          <button
            type="submit"
            className="ay-search-icon-button"
            aria-label="Hizmet ara"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              padding: 0,
              lineHeight: 0,
            }}
          >
            <Search
              size={20}
              strokeWidth={1.6}
              aria-hidden="true"
              style={{
                display: "block",
                width: 20,
                height: 20,
                minWidth: 20,
                minHeight: 20,
                flexShrink: 0,
              }}
            />
          </button>
        )}

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Hizmet ara..."
          aria-label="Hizmet ara"
          autoComplete="off"
          aria-expanded={visible}
          aria-controls={
            mobile
              ? "ay-mobile-search-results"
              : "ay-desktop-search-results"
          }
        />

        {mobile && (
          <button
            type="submit"
            className="ay-menu-search-submit"
            disabled={!value.trim()}
            aria-label="Aramayı başlat"
          >
            <ArrowRight
              size={19}
              strokeWidth={1.6}
            />
          </button>
        )}
      </form>

      {visible && (
        <div
          id={
            mobile
              ? "ay-mobile-search-results"
              : "ay-desktop-search-results"
          }
          className="ay-search-results"
          role="listbox"
          aria-label="Hizmet arama sonuçları"
        >
          {matches.length > 0 ? (
            matches.map((service, index) => (
              <button
                key={service.id}
                type="button"
                role="option"
                aria-selected={
                  selectedIndex === index
                }
                className={`ay-search-result ${
                  selectedIndex === index
                    ? "is-selected"
                    : ""
                }`}
                onMouseDown={(event) =>
                  event.preventDefault()
                }
                onClick={() =>
                  chooseService(service.id)
                }
              >
                <span>{service.title}</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                />
              </button>
            ))
          ) : (
            <p className="ay-search-empty">
              Eşleşen hizmet bulunamadı.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const suppressHoverRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const pendingSectionRef = useRef(null);

  const closeAllMenus = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setGalleryOpen(false);
    setMobileGalleryOpen(false);
  }, []);

  const closeServicesDropdown = useCallback(
    (suppressHover = false) => {
      setServicesOpen(false);

      if (suppressHover) {
        suppressHoverRef.current = true;
      }
    },
    []
  );

  /* =========================================
     NAVBAR SCROLL STATE
  ========================================= */

  useEffect(() => {
    let lastScrolled = null;

    const syncScroll = () => {
      const next = window.scrollY > 30;

      if (next === lastScrolled) return;

      lastScrolled = next;

      document.documentElement.dataset.ayNav =
        next ? "compact" : "expanded";

      setScrolled(next);
    };

    syncScroll();

    window.addEventListener("scroll", syncScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        syncScroll
      );

      delete document.documentElement.dataset.ayNav;
    };
  }, []);

  /* =========================================
     SECTION SCROLL
  ========================================= */


const scrollToSection = useCallback(
  (sectionId, behavior = "smooth") => {
    const section = document.getElementById(sectionId);

    if (!section) return false;

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY;

    // globals.css dosyasındaki gerçek kompakt yükseklikler
    const rootStyles = getComputedStyle(
      document.documentElement
    );

    const isMobile = window.matchMedia(
      "(max-width: 1279px)"
    ).matches;

    const variableName = isMobile
      ? "--mobile-scrolled"
      : "--header-scrolled";

    const compactHeight = parseFloat(
      rootStyles.getPropertyValue(variableName)
    );

    const headerOffset = Number.isFinite(compactHeight)
      ? compactHeight
      : isMobile
        ? 72
        : 82;

    // Hedef bölüm Navbar'ın hemen altında başlar.
    const targetTop = Math.max(
      0,
      sectionTop - headerOffset
    );

    window.scrollTo({
      top: targetTop,
      behavior,
    });

    return true;
  },
  []
);



  /* =========================================
     ACTIVE SECTION DETECTION
  ========================================= */

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const updateActiveSection = () => {
      const headerHeight = getHeaderHeight();
      const activationLine = headerHeight + 24;

      const gallerySection =
        document.getElementById("galeri");

      const contactSection =
        document.getElementById("iletisim");

      const aboutSection =
        document.getElementById("hakkimizda");

      if (contactSection) {
        const rect =
          contactSection.getBoundingClientRect();

        if (
          rect.top <= activationLine &&
          rect.bottom > activationLine
        ) {
          setActiveSection("iletisim");
          return;
        }
      }

      if (gallerySection) {
        const rect = gallerySection.getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom > activationLine) {
          setActiveSection("galeri");
          return;
        }
      }

      if (aboutSection) {
        const rect =
          aboutSection.getBoundingClientRect();

        if (
          rect.top <= activationLine &&
          rect.bottom > activationLine
        ) {
          setActiveSection("hakkimizda");
          return;
        }
      }

      setActiveSection("");
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, [pathname]);

  /* =========================================
     CLOSE MENUS ON PAGE CHANGE
  ========================================= */

  useEffect(() => {
    closeAllMenus();

    // İlk sayfa yüklemesinde hover engellenmez.
    if (previousPathnameRef.current !== pathname) {
      suppressHoverRef.current = true;
    }

    previousPathnameRef.current = pathname;
  }, [pathname, closeAllMenus]);

  /* =========================================
     HANDLE CROSS-PAGE HASH NAVIGATION
  ========================================= */

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.slice(1);

    const sectionId =
      pendingSectionRef.current ||
      (hash === "iletisim" || hash === "hakkimizda" || hash === "galeri"
        ? hash
        : null);

    if (!sectionId) return;

    pendingSectionRef.current = null;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameOne;
    let frameTwo;

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        scrollToSection(
          sectionId,
          reducedMotion ? "instant" : "auto"
        );
      });
    });

    return () => {
      window.cancelAnimationFrame(frameOne);

      if (frameTwo) {
        window.cancelAnimationFrame(frameTwo);
      }
    };
  }, [pathname, scrollToSection]);

  /* =========================================
     MOBILE MENU SCROLL LOCK
  ========================================= */

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAllMenus();
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
  }, [menuOpen, closeAllMenus]);

  /* =========================================
     SERVICE NAVIGATION
  ========================================= */

  const navigateToService = useCallback(
    (id) => {
      const service = services.find(
        (item) => item.id === id
      );

      if (!service) return;

      closeAllMenus();
      suppressHoverRef.current = true;
      setSearch("");

      router.push(serviceUrl(id), {
        scroll: false,
      });
    },
    [router, closeAllMenus]
  );

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    const normalized = normalizeText(query);

    const matched = services.find((service) =>
      normalizeText(service.title).includes(normalized)
    );

    if (matched) {
      navigateToService(matched.id);
      return;
    }

    closeAllMenus();
    suppressHoverRef.current = true;
    setSearch("");

    router.push(
      `/hizmetler?search=${encodeURIComponent(query)}`,
      { scroll: false }
    );
  };

  /* =========================================
     HOME SECTION NAVIGATION
  ========================================= */

  const handleSectionNavigation = (
    event,
    sectionId
  ) => {
    closeAllMenus();
    suppressHoverRef.current = true;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (pathname === "/") {
      const section =
        document.getElementById(sectionId);

      if (!section) return;

      event.preventDefault();

      window.history.replaceState(
        window.history.state,
        "",
        `/#${sectionId}`
      );

      scrollToSection(
        sectionId,
        reducedMotion ? "instant" : "smooth"
      );

      setActiveSection(sectionId);
      return;
    }

    // Farklı sayfadan anasayfadaki bölüme geçiş.
    event.preventDefault();

    pendingSectionRef.current = sectionId;

    router.push(`/#${sectionId}`, {
      scroll: false,
    });
  };

  const handleNavigationClick = (
    event,
    item
  ) => {
    if (item.sectionId) {
      handleSectionNavigation(
        event,
        item.sectionId
      );
      return;
    }

    closeAllMenus();
    suppressHoverRef.current = true;
  };

  const handleLogoClick = (event) => {
    closeAllMenus();
    suppressHoverRef.current = true;
    pendingSectionRef.current = null;
    setActiveSection("");

    if (pathname === "/") {
      event.preventDefault();

      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", "/");
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }
    // Diğer sayfalarda Link normal biçimde / adresine yönlendirir.
  };

  const isActiveLink = (item) => {
    if (item.sectionId) {
      return (
        pathname === "/" &&
        activeSection === item.sectionId
      );
    }

    return pathname === item.href;
  };

  /* =========================================
     DESKTOP DROPDOWN
  ========================================= */

 const handleServicesMouseEnter = () => {
  suppressHoverRef.current = false;
  setGalleryOpen(false);
  setServicesOpen(true);
};

const handleServicesMouseLeave = () => {
  setServicesOpen(false);
};

const handleServicesFocus = () => {
  suppressHoverRef.current = false;
  setServicesOpen(true);
};

  const handleServicesKeyDown = (event) => {
    if (event.key === "Escape") {
      closeServicesDropdown(true);

      if (
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur();
      }
    }
  };

  const handleGalleryMouseEnter = () => {
    setServicesOpen(false);
    setGalleryOpen(true);
  };

  const handleGalleryMouseLeave = () => setGalleryOpen(false);

  const handleGalleryKeyDown = (event) => {
    if (event.key === "Escape") {
      setGalleryOpen(false);
      event.currentTarget.querySelector(".ay-gallery-nav-trigger")?.focus();
    }
  };

  const handleAllServicesClick = (event) => {
    event.preventDefault();

    closeAllMenus();
    suppressHoverRef.current = true;
    setSearch("");

    router.push("/hizmetler", {
      scroll: false,
    });
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`ay-header ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="ay-header-inner">
          {/* DESKTOP SEARCH */}
          <div className="ay-left">
            <SearchForm
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
              onChoose={navigateToService}
            />
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="ay-desktop-center"
            aria-label="Ana navigasyon"
          >
            <div className="ay-nav-group ay-nav-group-left">
              <Link
                href="/#hakkimizda"
                onClick={(event) =>
                  handleSectionNavigation(
                    event,
                    "hakkimizda"
                  )
                }
                className={`ay-link ${
                  activeSection === "hakkimizda" &&
                  pathname === "/"
                    ? "active"
                    : ""
                }`}
              >
                Hakkımızda
              </Link>

              {/* SERVICES DROPDOWN */}
              <div
                className="ay-services-nav-wrapper"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                onKeyDown={handleServicesKeyDown}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget
                    )
                  ) {
                    setServicesOpen(false);
                  }
                }}
              >
                <Link
                  href="/hizmetler"
                  className={`ay-link ay-services-nav-trigger ${
                    pathname === "/hizmetler"
                      ? "active"
                      : ""
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onFocus={handleServicesFocus}
                  onClick={handleAllServicesClick}
                >
                  Hizmetlerimiz

                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                  />
                </Link>

                <div
                  className={`ay-services-dropdown ${
                    servicesOpen ? "is-open" : ""
                  }`}
                  aria-hidden={!servicesOpen}
                  inert={!servicesOpen}
                >
                  <span className="ay-dropdown-eyebrow">
                    HİZMETLERİMİZ
                  </span>

                  <div className="ay-dropdown-list">
                    {services.map((service, index) => (
                      <Link
                        key={service.id}
                        href={serviceUrl(service.id)}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToService(service.id);
                        }}
                        className="ay-dropdown-item"
                      >
                        <small>
                          {String(index + 1).padStart(2, "0")}
                        </small>

                        <span>{service.title}</span>

                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.5}
                        />
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/hizmetler"
                    className="ay-dropdown-all"
                    onClick={handleAllServicesClick}
                  >
                    Tüm Hizmetler

                    <ArrowRight
                      size={17}
                      strokeWidth={1.5}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* DESKTOP LOGO */}
            <div className="ay-desktop-brand">
              <Logo onClick={handleLogoClick} />
            </div>

            {/* RIGHT NAVIGATION */}
            <div className="ay-nav-group ay-nav-group-right">
              {/* GALLERY DROPDOWN */}
              <div
                className="ay-gallery-nav-wrapper"
                onMouseEnter={handleGalleryMouseEnter}
                onMouseLeave={handleGalleryMouseLeave}
                onKeyDown={handleGalleryKeyDown}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setGalleryOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={`ay-link ay-gallery-nav-trigger ${
                    (pathname === "/galeri" ||
                      (pathname === "/" && activeSection === "galeri"))
                      ? "active"
                      : ""
                  }`}
                  aria-expanded={galleryOpen}
                  aria-controls="ay-gallery-dropdown"
                  onFocus={() => setGalleryOpen(true)}
                  onClick={() => setGalleryOpen((open) => !open)}
                >
                  Galeri
                  <ChevronDown size={14} strokeWidth={1.5} />
                </button>

                <div
                  id="ay-gallery-dropdown"
                  className={`ay-gallery-dropdown ${galleryOpen ? "is-open" : ""}`}
                  aria-hidden={!galleryOpen}
                  inert={!galleryOpen}
                >
                  <span className="ay-dropdown-eyebrow">GALERİ</span>
                  <div className="ay-dropdown-list">
                    <Link
                      href="/#galeri"
                      className="ay-dropdown-item"
                      onClick={(event) => handleSectionNavigation(event, "galeri")}
                    >
                      <small>01</small>
                      <span>Çalışmalarımız</span>
                      <ArrowUpRight size={15} strokeWidth={1.5} />
                    </Link>
                    <Link
                      href="/galeri"
                      className="ay-dropdown-item"
                      onClick={() => {
                        closeAllMenus();
                        suppressHoverRef.current = true;
                      }}
                    >
                      <small>02</small>
                      <span>Tüm Projelerimiz</span>
                      <ArrowUpRight size={15} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/#iletisim"
                onClick={(event) => handleSectionNavigation(event, "iletisim")}
                className={`ay-link ${
                  pathname === "/" && activeSection === "iletisim" ? "active" : ""
                }`}
              >
                İletişim
              </Link>
            </div>
          </nav>

          {/* MOBILE LOGO */}
          <div className="ay-mobile-brand">
            <Logo onClick={handleLogoClick} />
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="ay-right">
            <a
              href={phoneHref}
              className="ay-contact ay-contact-call"
              aria-label="Telefonla ara"
            >
              <span className="ay-contact-icon">
                <PhoneCall
                  size={18}
                  strokeWidth={1.8}
                />
              </span>

              <span>Ara</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ay-contact ay-contact-whatsapp"
              aria-label="WhatsApp üzerinden teklif al"
            >
              <span className="ay-contact-icon">
                <MessageCircle
                  size={19}
                  strokeWidth={1.8}
                />
              </span>

              <span>Teklif Al</span>
            </a>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="ay-mobile-actions">
            <a
              href={phoneHref}
              className="ay-contact ay-contact-call ay-mobile-contact"
              aria-label="Telefonla ara"
            >
              <span className="ay-contact-icon">
                <PhoneCall
                  size={18}
                  strokeWidth={1.8}
                />
              </span>

              <span className="ay-contact-label">
                Ara
              </span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ay-contact ay-contact-whatsapp ay-mobile-contact"
              aria-label="WhatsApp üzerinden teklif al"
            >
              <span className="ay-contact-icon">
                <MessageCircle
                  size={19}
                  strokeWidth={1.8}
                />
              </span>

              <span className="ay-contact-label">
                Teklif Al
              </span>
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            className="ay-hamburger"
            aria-label={
              menuOpen ? "Menüyü kapat" : "Menüyü aç"
            }
            aria-expanded={menuOpen}
            aria-controls="ay-mobile-menu"
            onClick={() => {
              setMenuOpen((open) => !open);
               setMobileServicesOpen(false);
               setMobileGalleryOpen(false);
            }}
          >
            {menuOpen ? (
              <X
                size={22}
                strokeWidth={1.6}
              />
            ) : (
              <Menu
                size={22}
                strokeWidth={1.6}
              />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        id="ay-mobile-menu"
        className={`ay-mobile-menu ${
          menuOpen ? "open" : ""
        } ${scrolled ? "scrolled" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="ay-mobile-menu-inner">
          {/* MOBILE SEARCH */}
          <SearchForm
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
            onChoose={navigateToService}
            mobile
          />

          {/* MOBILE NAVIGATION */}
          <nav
            className="ay-mobile-navigation"
            aria-label="Mobil navigasyon"
          >
            {navigation.map((item, index) =>
              item.href === "/hizmetler" ? (
                <div
                  key={item.href}
                  className="ay-mobile-services-group"
                >
                  <button
                    type="button"
                    className="ay-mobile-link ay-mobile-services-toggle"
                    aria-expanded={mobileServicesOpen}
                    aria-controls="ay-mobile-services-list"
                    onClick={() =>
                      setMobileServicesOpen(
                        (open) => !open
                      )
                    }
                  >
                    <span>Hizmetlerimiz</span>

                    <span className="ay-mobile-link-meta">
                      <small>02</small>

                      <ChevronDown
                        size={19}
                        strokeWidth={1.6}
                        className={
                          mobileServicesOpen
                            ? "is-rotated"
                            : ""
                        }
                      />
                    </span>
                  </button>

                  {mobileServicesOpen && (
                    <div
                      id="ay-mobile-services-list"
                      className="ay-mobile-services-list"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={serviceUrl(service.id)}
                          onClick={(event) => {
                            event.preventDefault();
                            navigateToService(service.id);
                          }}
                        >
                          {service.title}

                          <ArrowUpRight
                            size={15}
                            strokeWidth={1.5}
                          />
                        </Link>
                      ))}

                      <Link
                        href="/hizmetler"
                        className="ay-mobile-services-all"
                        onClick={handleAllServicesClick}
                      >
                        Tüm Hizmetler

                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              ) : item.label === "Galeri" ? (
                <div key="galeri" className="ay-mobile-services-group">
                  <button
                    type="button"
                    className="ay-mobile-link ay-mobile-services-toggle"
                    aria-expanded={mobileGalleryOpen}
                    aria-controls="ay-mobile-gallery-list"
                    onClick={() => {
                     setMobileServicesOpen(false);
                      setMobileGalleryOpen((open) => !open);
                    }}
                  >
                    <span>Galeri</span>
                    <span className="ay-mobile-link-meta">
                      <small>03</small>
                      <ChevronDown
                        size={19}
                        strokeWidth={1.6}
                        className={mobileGalleryOpen ? "is-rotated" : ""}
                      />
                    </span>
                  </button>
                  {mobileGalleryOpen && (
                    <div id="ay-mobile-gallery-list" className="ay-mobile-services-list">
                      <Link
                        href="/#galeri"
                        onClick={(event) => handleSectionNavigation(event, "galeri")}
                      >
                        Çalışmalarımız
                        <ArrowUpRight size={15} strokeWidth={1.5} />
                      </Link>
                      <Link
                        href="/galeri"
                        onClick={() => closeAllMenus()}
                      >
                        Tüm Projelerimiz
                        <ArrowUpRight size={15} strokeWidth={1.5} />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handleNavigationClick(event, item)
                  }
                  className="ay-mobile-link"
                >
                  <span>{item.label}</span>

                  <span className="ay-mobile-link-meta">
                    <small>
                      0{index + 1}
                    </small>

                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.6}
                    />
                  </span>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
