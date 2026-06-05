"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/site";
import { switchLocalePath } from "@/lib/site";
import { getContent } from "@/content";

export function FooterLocale({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { footer } = getContent(locale);
  const otherHref = switchLocalePath(locale, pathname);

  return (
    <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/90 sm:justify-end">
      {locale === "uk" ? (
        <>
          <span className="font-medium text-white sm:hidden">Укр</span>
          <span className="hidden font-medium text-white sm:inline">
            {footer.langUk}
          </span>
          <span className="text-white/50">|</span>
          <Link href={otherHref} className="hover:text-tera-gold" hrefLang="en">
            <span className="sm:hidden">Eng</span>
            <span className="hidden sm:inline">{footer.langEn}</span>
          </Link>
        </>
      ) : (
        <>
          <Link href={otherHref} className="hover:text-tera-gold" hrefLang="uk">
            <span className="sm:hidden">Укр</span>
            <span className="hidden sm:inline">{footer.langUk}</span>
          </Link>
          <span className="text-white/50">|</span>
          <span className="font-medium text-white sm:hidden">Eng</span>
          <span className="hidden font-medium text-white sm:inline">
            {footer.langEn}
          </span>
        </>
      )}
    </p>
  );
}
