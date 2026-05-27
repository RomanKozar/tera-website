"use client";

import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { getSiteMeta, localePath, type Locale } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { FooterLocale } from "./FooterLocale";

export function TopBar({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const site = getSiteMeta(locale);

  return (
    <header className="bg-tera-navy text-white">
      <article className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:py-2.5">
        <Link
          href={localePath(locale, "/")}
          className="flex h-16 w-20 shrink-0 items-center overflow-visible lg:h-[52px] lg:w-28"
          aria-label={ui.goToHome}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src={IMAGES.logo}
            alt={site.name}
            width={180}
            height={100}
            className="h-full w-auto origin-left scale-110 lg:scale-[1.45]"
            priority
            unoptimized
          />
        </Link>

        <p className="min-w-0 -ml-4 truncate text-left text-sm font-bold uppercase tracking-wide text-white lg:hidden">
          {site.shortName}
        </p>

        <p className="hidden text-left text-[9px] font-semibold uppercase leading-snug tracking-wide text-white/95 lg:block lg:text-xs">
          {site.headerTitle}
        </p>

        <div className="flex items-center justify-end gap-2 justify-self-end pr-12 lg:gap-3 lg:pr-0">
          <FooterLocale locale={locale} />
          <a
            href={site.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-tera-blue transition-opacity hover:opacity-90 lg:h-10 lg:w-10"
            aria-label={ui.facebookAria}
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
      </article>
    </header>
  );
}
