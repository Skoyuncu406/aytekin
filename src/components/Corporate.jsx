
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./Corporate.css";

export default function Corporate() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    let cancelled = false;

    async function init() {
      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }

      const [{ default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".ay-corporate-reveal",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }, sectionRef);
    }

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#hakkimizda") {
      return;
    }

    let cancelled = false;
    const timeouts = [];

    const alignToAbout = () => {
      if (cancelled || !sectionRef.current) return;

      const headerHeight =
        document
          .querySelector(".ay-header")
          ?.getBoundingClientRect().height ??
        (window.innerWidth <= 1279 ? 72 : 82);

      const sectionTop =
        sectionRef.current.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: Math.max(0, sectionTop - headerHeight),
        behavior: "instant",
      });
    };

    const refreshAndAlign = async () => {
      const { ScrollTrigger } = await import(
        "gsap/ScrollTrigger"
      );

      if (cancelled) return;

      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        requestAnimationFrame(alignToAbout);
      });
    };

    timeouts.push(setTimeout(refreshAndAlign, 150));
    timeouts.push(setTimeout(refreshAndAlign, 650));

    const handleLoad = () => {
      refreshAndAlign();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hakkimizda"
      className="ay-corporate"
      aria-labelledby="ay-corporate-title"
    >
      <div
        className="ay-corporate-visual"
        aria-hidden="true"
      />

      <div className="ay-corporate-container">
        <div className="ay-corporate-intro">
          <div className="ay-corporate-eyebrow ay-corporate-reveal">
            <span className="ay-corporate-eyebrow-line" />
            BİZ KİMİZ?
          </div>

          <h2
            id="ay-corporate-title"
            className="ay-corporate-title ay-corporate-reveal"
          >
            Güvenle başlayan,
            <br />
            <em>konforla devam eden</em>
            <br />
            çözümler.
          </h2>
        </div>

        <div className="ay-corporate-content">
          <div className="ay-corporate-content-heading ay-corporate-reveal">
            <span className="ay-corporate-index">
              01 / HAKKIMIZDA
            </span>

            <h3>
              Her detayda kalite,
              <br />
              her projede güven.
            </h3>
          </div>

          <div className="ay-corporate-description ay-corporate-reveal">
            <p className="ay-corporate-lead">
              Aytekin Otomasyon olarak otomatik kepenk,
              panjur, sineklik ve modern otomasyon
              sistemleriyle yaşam alanlarına güvenlik,
              konfor ve estetik kazandırıyoruz.
            </p>

            <p>
              Her projenin kendine özgü ihtiyaçları
              olduğuna inanıyor; kaliteli malzemeleri,
              işlevsel tasarımları ve güncel teknolojileri
              bir araya getirerek uzun ömürlü çözümler
              sunmayı hedefliyoruz.
            </p>

            <p>
              İlk keşiften uygulama ve teknik desteğe
              kadar tüm süreçlerde titiz, şeffaf ve çözüm
              odaklı bir yaklaşım benimsiyoruz.
              Önceliğimiz, müşterilerimizin güvenle
              kullanabileceği sistemler oluşturmaktır.
            </p>

            <Link
              href="/iletisim"
              className="ay-corporate-link"
            >
              Bizimle İletişime Geçin
              <ArrowUpRight
                size={19}
                strokeWidth={1.6}
              />
            </Link>
          </div>
        </div>

        <div className="ay-corporate-bottom ay-corporate-reveal">
          <div className="ay-corporate-bottom-line" />

          <div className="ay-corporate-bottom-inner">
            <span>
              KALİTELİ İŞÇİLİK
              <br />
              GÜVENİLİR ÇÖZÜMLER
            </span>

            <span className="ay-corporate-signature">
              AYTEKİN OTOMASYON
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
