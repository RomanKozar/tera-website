"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useImageLightboxOptional } from "./ImageLightboxProvider";

export function OpenableImage({
  groupId,
  index,
  src,
  alt,
  wrapperClassName,
  imageClassName,
  sizes,
  priority,
  children,
}: {
  groupId: string;
  index: number;
  src: string;
  alt: string;
  wrapperClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const lightbox = useImageLightboxOptional();

  useEffect(() => {
    if (!lightbox) return;
    lightbox.register(groupId, index, { src, alt });
    return () => lightbox.unregister(groupId, index);
  }, [lightbox, groupId, index, src, alt]);

  if (!lightbox) {
    return (
      <div className={wrapperClassName}>
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClassName}
          sizes={sizes}
          priority={priority}
        />
        {children}
      </div>
    );
  }

  const { openHint } = lightbox.labels;

  return (
    <button
      type="button"
      onClick={() => lightbox.open(groupId, index)}
      className={`group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tera-blue ${wrapperClassName ?? ""}`}
      aria-label={`${openHint}: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-transform duration-300 group-hover:scale-[1.02] ${imageClassName ?? "object-cover"}`}
        sizes={sizes}
        priority={priority}
      />
      {children}
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-tera-navy/75 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {openHint}
      </span>
    </button>
  );
}
