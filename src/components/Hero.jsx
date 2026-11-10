
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
} from "lucide-react";

import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const shutterRef = useRef(null);
  const shutterBrandRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const scrollHintRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    let context;
    let cancelled = false;
    let resizeObserver;

    async function initialize() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import(
        "gsap/ScrollTrigger"
      );

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // Navbar yüksekliğini gerçek zamanlı takip et.
      const header = document.querySelector(".ay-header");

      const syncHeaderHeight = () => {
        if (!header || !sectionRef.current) return;

        const height = header.getBoundingClientRect().height;

        sectionRef.current.style.setProperty(
          "--hero-nav-height",
          `${height}px`
        );
      };

      syncHeaderHeight();

      if (header && "ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(syncHeaderHeight);
        resizeObserver.observe(header);
      }

      context = gsap.context(() => {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
          gsap.set(shutterRef.current, {
            yPercent: -100,
          });

          gsap.set(contentRef.current, {
            autoAlpha: 1,
            y: 0,
          });

          gsap.set(imageRef.current, {
            scale: 1,
          });

          gsap.set(scrollHintRef.current, {
            autoAlpha: 0,
          });

          return;
        }

        gsap.set(contentRef.current, {
          autoAlpha: 0,
          y: 45,
        });

        gsap.set(imageRef.current, {
          scale: 1.12,
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            scrollHintRef.current,
            {
              autoAlpha: 0,
              duration: 0.12,
            },
            0
          )
          .to(
            shutterRef.current,
            {
              yPercent: -100,
              duration: 0.78,
            },
            0.05
          )
          .to(
            shutterBrandRef.current,
            {
              autoAlpha: 0,
              duration: 0.22,
            },
            0.08
          )
          .to(
            imageRef.current,
            {
              scale: 1,
              duration: 0.85,
            },
            0.05
          )
          .to(
            contentRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.32,
            },
            0.53
          );
      }, sectionRef);
    }

    initialize();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ay-hero"
      aria-label="Aytekin Otomasyon"
    >
      <div ref={stageRef} className="ay-hero-stage">
        {/* BACKGROUND */}

        <div className="ay-hero-background">
          <div
            ref={imageRef}
            className="ay-hero-image"
          />

          <div className="ay-hero-image-overlay" />
        </div>

        {/* HERO CONTENT */}

        <div
          ref={contentRef}
          className="ay-hero-content"
        >
          <div className="ay-hero-content-inner">
            <div className="ay-hero-eyebrow">
              <span className="ay-hero-eyebrow-line" />
              <span>
                YAŞAM ALANLARINIZA DEĞER KATIYORUZ
              </span>
            </div>

            <h1 className="ay-hero-title">
              Konforu
              <br />
              <em>yeniden</em>
              <br />
              tanımlıyoruz.
            </h1>

            <p className="ay-hero-description">
              Kepenk, panjur, sineklik ve modern
              otomasyon sistemleriyle yaşam alanlarınıza
              estetik, güvenlik ve işlevsellik katıyoruz.
            </p>

            <div className="ay-hero-buttons">
              <Link
                href="/hizmetler"
                className="ay-hero-primary-button"
              >
                <span>Hizmetlerimizi Keşfedin</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.6}
                />
              </Link>

              <Link
                href="/iletisim"
                className="ay-hero-secondary-button"
              >
                <span>Bizimle İletişime Geçin</span>
                <MoveUpRight
                  size={18}
                  strokeWidth={1.6}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* METAL SHUTTER */}

        <div
          ref={shutterRef}
          className="ay-hero-shutter"
          aria-hidden="true"
        >
          <div className="ay-hero-shutter-surface" />
          <div className="ay-hero-shutter-light" />

          <div
            ref={shutterBrandRef}
            className="ay-hero-shutter-brand"
          >
            <span className="ay-hero-shutter-brand-top">
              AYTEKİN
            </span>

            <span className="ay-hero-shutter-brand-bottom">
              OTOMASYON
            </span>

            <span className="ay-hero-shutter-brand-line" />

            <span className="ay-hero-shutter-brand-caption">
              MODERN YAŞAMIN AKILLI ÇÖZÜMLERİ
            </span>
          </div>

          <div className="ay-hero-shutter-bottom" />
        </div>

        {/* SCROLL HINT */}

        <div
          ref={scrollHintRef}
          className="ay-hero-scroll-hint"
          aria-hidden="true"
        >
          <span>AŞAĞI KAYDIRIN</span>

          <div className="ay-hero-scroll-icon">
            <ArrowDown
              size={18}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
