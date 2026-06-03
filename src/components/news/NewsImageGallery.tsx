"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string };

type GalleryLabels = {
  close: string;
  previous: string;
  next: string;
  counterOf: string;
  openHint: string;
  locale: "uk" | "en";
};

export function NewsImageGallery({
  images,
  labels,
}: {
  images: GalleryImage[];
  labels: GalleryLabels;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, goPrev, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || openIndex === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (!images.length) return null;

  const formatCounter = (current: number, total: number) =>
    labels.locale === "uk"
      ? `Фото ${current} ${labels.counterOf} ${total}`
      : `Photo ${current} ${labels.counterOf} ${total}`;

  const [main, ...rest] = images;

  return (
    <>
      <div className="mt-6 space-y-5">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-tera-nav-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tera-blue"
          aria-label={`${labels.openHint}: ${main.alt}`}
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-tera-navy/75 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            {labels.openHint}
          </span>
        </button>

        {rest.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setOpenIndex(idx + 1)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-tera-nav-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tera-blue"
                aria-label={`${labels.openHint}: ${photo.alt}`}
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-tera-navy/95 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={images[openIndex]?.alt}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white transition-colors hover:bg-white/25"
            aria-label={labels.close}
          >
            ×
          </button>

          <p className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
            {formatCounter(openIndex + 1, images.length)}
          </p>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-2xl text-white transition-colors hover:bg-white/25 sm:left-6 sm:h-12 sm:w-12"
                aria-label={labels.previous}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-2xl text-white transition-colors hover:bg-white/25 sm:right-6 sm:h-12 sm:w-12"
                aria-label={labels.next}
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative h-[min(85vh,720px)] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <p className="absolute bottom-4 left-1/2 z-10 max-w-xl -translate-x-1/2 px-4 text-center text-sm text-white/85">
            {images[openIndex].alt}
          </p>
        </div>
      ) : null}
    </>
  );
}
