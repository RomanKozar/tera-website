"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LightboxImage, LightboxLabels } from "./types";

export function ImageLightboxOverlay({
  images,
  openIndex,
  onClose,
  onPrev,
  onNext,
  labels,
}: {
  images: LightboxImage[];
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  labels: LightboxLabels;
}) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, onClose, onPrev, onNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || openIndex === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) onPrev();
    else onNext();
  };

  if (openIndex === null || !images[openIndex]) return null;

  const formatCounter = (current: number, total: number) =>
    labels.locale === "uk"
      ? `Фото ${current} ${labels.counterOf} ${total}`
      : `Photo ${current} ${labels.counterOf} ${total}`;

  const current = images[openIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-tera-navy/95 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
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
              onPrev();
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
              onNext();
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
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      <p className="absolute bottom-4 left-1/2 z-10 max-w-xl -translate-x-1/2 px-4 text-center text-sm text-white/85">
        {current.alt}
      </p>
    </div>
  );
}
