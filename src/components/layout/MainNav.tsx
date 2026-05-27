"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IMAGES } from "@/lib/images";
import type { NavItem } from "@/lib/navigation";
import { getSiteMeta, type Locale } from "@/lib/site";

const linkBase =
  "flex cursor-pointer items-center gap-1 px-2 py-3.5 text-sm font-medium text-tera-navy transition-colors hover:text-tera-blue lg:px-2.5";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`${linkBase} ${active ? "font-semibold text-tera-blue" : ""}`}
    >
      {item.label}
    </Link>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active =
    isActive(pathname, item.href) ||
    Boolean(item.children?.some((child) => isActive(pathname, child.href)));

  if (!item.children?.length) {
    return <NavLink item={item} />;
  }

  return (
    <li
      className="relative list-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`${linkBase} ${active ? "font-semibold text-tera-blue" : ""}`}
      >
        {item.label}
        <span className="text-[10px] opacity-70" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-30 min-w-[280px] border border-tera-border bg-white py-1 shadow-lg">
          {item.children.map((child) => (
            <li key={child.href} className="list-none">
              <Link
                href={child.href}
                className="block px-4 py-3 text-sm text-tera-navy hover:bg-tera-nav-bg hover:text-tera-blue"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function MainNav({
  items,
  menuLabel,
  menuCloseLabel,
  homeHref,
  locale,
}: {
  items: NavItem[];
  menuLabel: string;
  menuCloseLabel: string;
  homeHref: string;
  locale: Locale;
}) {
  const site = getSiteMeta(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      <nav
        className="hidden bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end lg:block"
        aria-label={menuLabel}
      >
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-start gap-0 px-4 sm:gap-1">
          {items.map((item) =>
            item.children?.length ? (
              <DesktopDropdown key={item.href} item={item} />
            ) : (
              <li key={item.href} className="list-none">
                <NavLink item={item} />
              </li>
            ),
          )}
        </ul>
      </nav>

      <section
        className="lg:hidden"
        aria-label={menuLabel}
      >
        <div className="h-1.5 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end" />
        <button
          type="button"
          className="absolute right-4 top-6 z-20 flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-tera-gold"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={menuLabel}
        >
          <span className="text-3xl leading-none" aria-hidden>
            ☰
          </span>
        </button>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/45" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label={menuCloseLabel}
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative mr-auto flex h-dvh w-[min(86vw,360px)] flex-col bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end text-tera-navy shadow-2xl">
              <div className="flex h-24 items-center justify-between gap-4 bg-tera-navy px-7">
                <Link
                  href={homeHref}
                  className="flex h-16 shrink-0 items-center"
                  onClick={() => setMobileOpen(false)}
                  aria-label={site.name}
                >
                  <Image
                    src={IMAGES.logo}
                    alt={site.name}
                    width={180}
                    height={100}
                    className="h-full w-auto"
                    unoptimized
                  />
                </Link>
                <p className="min-w-0 flex-1 truncate text-sm font-bold uppercase tracking-wide text-white">
                  {site.shortName}
                </p>
                <button
                  type="button"
                  className="text-4xl leading-none text-white transition-colors hover:text-tera-gold"
                  onClick={() => setMobileOpen(false)}
                  aria-label={menuCloseLabel}
                >
                  ×
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-9 py-8" aria-label={menuLabel}>
                <ul>
                  {items.map((item) => {
                    const active = isActive(pathname, item.href);
                    const expanded = expandedMobile === item.href;
                    const hasChildren = Boolean(item.children?.length);
                    const toggleExpanded = () =>
                      setExpandedMobile((current) =>
                        current === item.href ? null : item.href,
                      );

                    return (
                      <li key={item.href} className="list-none border-b border-tera-blue/15">
                        <div className="flex items-center justify-between gap-3">
                          {hasChildren ? (
                            <button
                              type="button"
                              className={`block flex-1 py-5 text-left text-base transition-colors hover:text-tera-blue ${
                                active ? "font-bold text-tera-blue" : "text-tera-navy"
                              }`}
                              onClick={toggleExpanded}
                              aria-expanded={expanded}
                            >
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className={`block flex-1 py-5 text-base transition-colors hover:text-tera-blue ${
                                active ? "font-bold text-tera-blue" : "text-tera-navy"
                              }`}
                            >
                              {item.label}
                            </Link>
                          )}
                          {hasChildren ? (
                            <button
                              type="button"
                              className="flex h-11 w-8 shrink-0 items-center justify-center text-tera-navy transition-colors hover:text-tera-blue"
                              onClick={toggleExpanded}
                              aria-expanded={expanded}
                              aria-label={item.label}
                            >
                              <span
                                aria-hidden
                                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                              >
                                ▾
                              </span>
                            </button>
                          ) : null}
                        </div>
                        {expanded && item.children?.length ? (
                          <ul className="pb-4">
                            {item.children.map((child) => (
                              <li key={child.href} className="list-none">
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2 pl-4 text-sm text-tera-navy/70 transition-colors hover:text-tera-blue"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

