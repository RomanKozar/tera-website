import Link from "next/link";
import { getContent } from "@/content";
import { SITE, type Locale } from "@/lib/site";
import type { NavItem } from "@/lib/navigation";
import { FooterLocale } from "./FooterLocale";

function ContactIcon({ type }: { type: "address" | "phone" | "email" }) {
  const paths = {
    address: (
      <>
        <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
        <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </>
    ),
    phone: (
      <path d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.8c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
    ),
    email: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-tera-gold"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden
    >
      {paths[type]}
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
  const contactItems = [
    { type: "address" as const, label: contacts.address },
    { type: "phone" as const, label: contacts.phone, href: "tel:+380671234567" },
    { type: "email" as const, label: contacts.email, href: `mailto:${contacts.email}` },
  ];

  return (
    <footer className="relative z-20 shrink-0 overflow-hidden bg-tera-navy text-white">
      <article className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <nav
            className="flex flex-wrap justify-center gap-4 sm:justify-start sm:gap-6"
            aria-label={locale === "uk" ? "Нижнє меню" : "Footer menu"}
          >
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white transition-colors hover:text-tera-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <FooterLocale locale={locale} />
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-white/85 sm:text-sm">
          <p className="font-semibold text-white">{footer.contactsLabel}:</p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            {contactItems.map((item) => (
              <li key={item.type} className="flex items-center justify-center gap-2 sm:justify-start">
                <ContactIcon type={item.type} />
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-tera-gold">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <p className="text-xs text-white/75">{copyright}</p>
        </div>
      </article>
    </footer>
  );
}
