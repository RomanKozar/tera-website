import Link from "next/link";
import { getContent } from "@/content";
import { SITE, type Locale } from "@/lib/site";
import type { NavItem } from "@/lib/navigation";
import { FooterLocale } from "./FooterLocale";

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-tera-gold"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

export function SiteFooter({
  locale,
  footerNav,
  copyright,
}: {
  locale: Locale;
  footerNav: NavItem[];
  copyright: string;
}) {
  const { footer } = getContent(locale);
  const { contacts } = SITE;
  const contactsLine = `${footer.contactsLabel}: ${contacts.address}, ${contacts.phone}, ${contacts.email}`;

  return (
    <footer className="mt-auto bg-tera-navy text-white">
      <article className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <nav
            className="flex flex-wrap justify-center gap-1 sm:justify-start sm:gap-2"
            aria-label={locale === "uk" ? "Нижнє меню" : "Footer menu"}
          >
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-white transition-colors hover:text-tera-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <FooterLocale locale={locale} />
        </div>

        <p className="mt-4 text-center text-xs text-white/85 sm:text-left sm:text-sm">
          {contactsLine}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <p className="text-xs text-white/75">{copyright}</p>
          <StarIcon />
        </div>
      </article>
    </footer>
  );
}
