
"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

const navigation = [
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
];

const phoneHref = "tel:+905531304458";

const whatsappHref =
  "https://wa.me/905531304458?text=" +
  encodeURIComponent(
    "Merhaba Aytekin Otomasyon, teklif almak istiyorum."
  );

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

function SearchForm({
  value,
  onChange,
  onSubmit,
  mobile = false,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={mobile ? "ay-menu-search" : "ay-search"}
      role="search"
    >
      {mobile ? (
        <Search
          size={20}
          strokeWidth={1.6}
          className="ay-search-symbol"
        />
      ) : (
        <button
          type="submit"
          className="ay-search-icon-button"
          aria-label="Hizmet ara"
        >
          <Search size={20} strokeWidth={1.6} />
        </button>
      )}

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Hizmet ara..."
        aria-label="Hizmet ara"
      />

      {mobile && (
        <button
          type="submit"
          className="ay-menu-search-submit"
          disabled={!value.trim()}
          aria-label="Aramayı başlat"
        >
          <ArrowRight size={19} strokeWidth={1.6} />
        </button>
      )}
    </form>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    setMenuOpen(false);

    router.push(
      `/hizmetler?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <>
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
            />
          </div>

          {/* DESKTOP CENTER NAVIGATION */}
          <nav
            className="ay-desktop-center"
            aria-label="Ana navigasyon"
          >
            <div className="ay-nav-group ay-nav-group-left">
              {navigation.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ay-link ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="ay-desktop-brand">
              <Logo />
            </div>

            <div className="ay-nav-group ay-nav-group-right">
              {navigation.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ay-link ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* MOBILE BRAND */}
          <div className="ay-mobile-brand">
            <Logo onClick={() => setMenuOpen(false)} />
          </div>

          {/* DESKTOP CONTACT ACTIONS */}
          <div className="ay-right">
            <a
              href={phoneHref}
              className="ay-contact ay-contact-call"
              aria-label="Telefonla ara"
            >
              <span className="ay-contact-icon">
                <PhoneCall size={18} strokeWidth={1.8} />
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
                <MessageCircle size={19} strokeWidth={1.8} />
              </span>
              <span>Teklif Al</span>
            </a>
          </div>

         
{/* MOBILE CONTACT ACTIONS */}
<div className="ay-mobile-actions">
  <a
    href={phoneHref}
    className="ay-contact ay-contact-call ay-mobile-contact"
    aria-label="Telefonla ara"
  >
    <span className="ay-contact-icon">
      <PhoneCall size={18} strokeWidth={1.8} />
    </span>
    <span className="ay-contact-label">Ara</span>
  </a>

  <a
    href={whatsappHref}
    target="_blank"
    rel="noopener noreferrer"
    className="ay-contact ay-contact-whatsapp ay-mobile-contact"
    aria-label="WhatsApp üzerinden teklif al"
  >
    <span className="ay-contact-icon">
      <MessageCircle size={19} strokeWidth={1.8} />
    </span>
    <span className="ay-contact-label">Teklif Al</span>
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
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.6} />
            ) : (
              <Menu size={22} strokeWidth={1.6} />
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
          <SearchForm
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
            mobile
          />

          <nav
            className="ay-mobile-navigation"
            aria-label="Mobil navigasyon"
          >
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="ay-mobile-link"
              >
                <span>{item.label}</span>

                <span className="ay-mobile-link-meta">
                  <small>0{index + 1}</small>
                  <ArrowUpRight size={19} strokeWidth={1.6} />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
