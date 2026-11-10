
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import Image from "next/image";
import "@/app/galeri/gallery-page.css";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function GalleryViewer({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const dialogRef = useRef(null);

  const isOpen = activeIndex !== null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || !images.length) {
        return current;
      }

      return (current + 1) % images.length;
    });
  }, [images.length]);

  const previous = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || !images.length) {
        return current;
      }

      return (
        (current - 1 + images.length) % images.length
      );
    });
  }, [images.length]);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const open = (index) => {
    previousFocusRef.current = document.activeElement;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll(
            'button:not([disabled]), a[href]'
          ) || []
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, close, next, previous]);

  if (!images.length) return null;

  const activeImage =
    activeIndex === null
      ? null
      : images[activeIndex];

  const previousIndex =
    activeIndex === null
      ? null
      : (activeIndex - 1 + images.length) %
        images.length;

  const nextIndex =
    activeIndex === null
      ? null
      : (activeIndex + 1) % images.length;

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const onTouchEnd = (event) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const differenceX =
      event.changedTouches[0].clientX -
      touchStartX.current;

    const differenceY =
      event.changedTouches[0].clientY -
      touchStartY.current;

    if (
      Math.abs(differenceX) > 55 &&
      Math.abs(differenceX) >
        Math.abs(differenceY) * 1.2
    ) {
      if (differenceX < 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const lightbox =
    isOpen && activeImage ? (
      <div
        ref={dialogRef}
        className="ay-gallery-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Galeri fotoğraf görüntüleyici"
      >
        <div
          className="ay-gallery-lightbox-backdrop"
          onClick={close}
          aria-hidden="true"
        />

        {/* TOP */}
        <div className="ay-gallery-lightbox-top">
          <span className="ay-gallery-lightbox-counter">
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="ay-gallery-counter-divider">
              /
            </span>
            {String(images.length).padStart(2, "0")}
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            className="ay-gallery-lightbox-close"
            onClick={close}
            aria-label="Görseli kapat"
          >
            <X size={23} strokeWidth={1.5} />
          </button>
        </div>

        {/* STAGE */}
        <div
          className="ay-gallery-lightbox-stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* PREVIOUS PREVIEW */}
          {images.length > 1 && (
            <button
              type="button"
              className="ay-gallery-lightbox-preview ay-gallery-lightbox-preview-prev"
              onClick={previous}
              aria-label="Önceki fotoğraf"
            >
              <Image
                src={images[previousIndex].src}
                alt=""
                fill
                sizes="150px"
              />
            </button>
          )}

          {/* MAIN IMAGE */}
          <div className="ay-gallery-lightbox-main">
            <Image
              key={activeImage.id}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 639px) 100vw, 80vw"
              className="ay-gallery-lightbox-image"
            />
          </div>

          {/* NEXT PREVIEW */}
          {images.length > 1 && (
            <button
              type="button"
              className="ay-gallery-lightbox-preview ay-gallery-lightbox-preview-next"
              onClick={next}
              aria-label="Sonraki fotoğraf"
            >
              <Image
                src={images[nextIndex].src}
                alt=""
                fill
                sizes="150px"
              />
            </button>
          )}

          {/* NAVIGATION ARROWS */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="ay-gallery-lightbox-arrow ay-gallery-lightbox-arrow-prev"
                onClick={previous}
                aria-label="Önceki fotoğraf"
              >
                <ChevronLeft size={25} />
              </button>

              <button
                type="button"
                className="ay-gallery-lightbox-arrow ay-gallery-lightbox-arrow-next"
                onClick={next}
                aria-label="Sonraki fotoğraf"
              >
                <ChevronRight size={25} />
              </button>
            </>
          )}
        </div>

        {/* BOTTOM */}
        <div className="ay-gallery-lightbox-bottom">
          <span>AYTEKİN OTOMASYON</span>

          <span className="ay-gallery-mobile-hint">
            Kaydırarak Keşfedin
          </span>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* GALLERY GRID */}
      <div className="ay-gallery-page-grid">
        {images.map((image, index) => (
          <figure
            className="ay-gallery-page-item"
            key={image.id}
          >
            <div className="ay-gallery-image-wrap">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1279px) 33vw, 25vw"
                className="ay-gallery-page-image"
              />

              <span
                className="ay-gallery-page-number"
                aria-hidden="true"
              >
                {String(image.id).padStart(2, "0")}
              </span>

              <button
                type="button"
                className="ay-gallery-zoom-button"
                onClick={() => open(index)}
                aria-label={`${image.alt} büyüt`}
              >
                <Search
                  size={20}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </figure>
        ))}
      </div>

      {mounted && lightbox
        ? createPortal(lightbox, document.body)
        : null}
    </>
  );
}
