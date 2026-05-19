import Image from "next/image";
import Link from "next/link";
import { SITE, type Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { FacebookIcon } from "@/components/icons/FacebookIcon";

export function TopBar({ locale }: { locale: Locale }) {
  const title =
    locale === "uk"
      ? SITE.headerTitle
      : "LOCAL ASSOCIATION OF LOCAL SELF-GOVERNMENT BODIES OF THE TEREBLYA VALLEY «TeRA»";

  return (
    <header className="bg-tera-navy text-white">
      <article className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={localePath(locale, "/")}
          className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4"
        >
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 rounded-full bg-white p-0.5 sm:h-14 sm:w-14"
            priority
          />
          <span className="hidden text-[10px] font-semibold uppercase leading-snug tracking-wide text-white/95 sm:block sm:text-xs lg:text-sm">
            {title}
          </span>
          <span className="text-sm font-bold sm:hidden">{SITE.name}</span>
        </Link>

        <a
          href={SITE.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-tera-blue transition-opacity hover:opacity-90"
          aria-label="Facebook"
        >
          <FacebookIcon className="h-5 w-5" />
        </a>
      </article>
    </header>
  );
}
